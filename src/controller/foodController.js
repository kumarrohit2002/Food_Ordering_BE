const foodService=require('../service/foodService');
const restaurantService=require('../service/RestaurantService');
const userService=require('../service/userService');

module.exports={
    //customer
    searchFood:async(req,res)=>{
        try{
            const {name}=req.query;
            const menuItem=await foodService.searchFood(name);
            res.status(200).json(menuItem);
        }catch(error){
            res.status(500).json({error:"Internel server Error"});
        }
    },

    getmenuItemByRestaurantId:async(req,res)=>{
        try{
            const {restaurantId}=req.params;
            const {vegetarian,seasonal,nonveg,food_category}=req.query;

            const menuItem=await foodService.getRestsurantsFood({
                restaurantId,
                vegetarian,
                nonveg,
                seasonal,
                food_category
            });

            res.status(200).json({menuItem});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    // Admin controller
    createItem:async(req,res)=>{
        try{
            const item=req.body;
            const restaurant=await restaurantService.getRestaurantById(item.restaurantId);

            const menuItem=await foodService.createFood(item,restaurant);

            res.status(200).json({menuItem});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    async deleteItem(req,res){
        try{
            const {id}=req.params;
            const user=req.user;

            await foodService.deleteFood(id);

            res.status(200).json({message:'menu item deleted'});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    async getMenuItemByName(req,res){
        try{
            const {name}=req.query;
            const menuItem=await foodService.searchFood(name);
            res.status(200).json({menuItem});

        }catch(error){
            res.status(500).json({error:"Internal server error"});
        }
    },

    async updateAvailibilityStatus(req,res){
        try{
            const {id}=req.params;

            const menuItem=await foodService.updateAvailibilityStatus(id);
            res.status(200).json({menuItem});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({error:"Internal server error"});
            }
        }
    },

    

}