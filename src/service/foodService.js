const Food=require('../models/food.model');

module.exports={
    async createFood(req,restaurant){
        try{
            const food=new Food({
                foodCategory:req.category,
                creationDate:new Date(),
                description:req.description,
                images:req.images,
                name:req.name,
                price:req.price,
                isSeasonal:req.seasonal,
                isVegtarian:req.vegtarian,
                restaurant:restaurant._id,
                ingredients:req.ingredients
            });

            await food.save();
            restaurant.foods.push(food._id);
            await restaurant.save();    
            return food;
        }catch(error){
            throw new Error(`faild to create food: ${error.message}`);
        }
    },

    async deleteFood(foodId){
        try{
            const food=await Food.findById(foodId);
            if(!food){
                throw new Error(`food not found with id: ${foodId}`);
            }
            
            await Food.findByIdAndDelete(foodId);
        }catch(error){
            throw new Error(`faild to update food: ${error.message}`)
        }
    },

    async updateFood(foodId){
        try{

        }catch(error){
            throw new Error(`faild to update food: ${error.message}`)
        }
    },

    async getRestsurantsFood(restaurantId,vegtarian,nonveg,seasonal,foodCategory){
        try{
            let query={restaurant:restaurantId};
            if(vegtarian=='true') query.isVegtarian=true;
            if(nonveg=='true') query.vegtarian=false;
            if(seasonal=='true') query.seasonal=true;
            if(foodCategory) query.foodCategory=foodCategory;

            const foods=await Food.find({query:query}).populate([
                    {path:'ingredients',populate:{path:'category',select:'name'}},
                    'foodCategory',
                    {path:'restaurent',select:'name _id'},
            ]);

            return foods;
        }catch(error){
            throw new Error(`faild to retrieve restaurant's food with error: ${error.message}`);
        }
    },

    async searchFood(keyword){
        try{
            let query = {};
            if(keyword){
                query.$or=[
                    {name:{$regex:keyword, $opations:'i'}},
                    {'foodCategory.name':{$regex:keyword, $opations:'i'}}
                ];
            }

            const food=await Food.find(query);
            return food;

        }catch(error){
            throw new Error(`faild to search food with error: ${error.message}`)
        }
    },

    async updateAvailibilityStatus(foodId){
        try{
            const food=await Food.findById(foodId).populate([
                {path:'ingredients',populate:{path:'category',select:'name'}},
                'foodCategory',
                {path:'restaurant',select:'name _id'}
            ]);

            if(!food){
                throw new Error(`Food not find with ID: ${foodId}`);
            }

            food.available= !food.available;
            await food.save();

            return food;
        }catch(error){
            throw new Error(`failed to update availability status for food with Id: ${foodId} and Error:${error.message}`);
        }
    },

    async findFoodById(foodId){
        try{
            const food=await Food.findById(foodId);
            if(!food){
                throw new Error(`food not found with Id: ${foodId}`);
            }
            return food;

        }catch(error){
            throw new Error(`food not found with Id: ${foodId} and Error:${error.message}`);
        }
    },

    

}