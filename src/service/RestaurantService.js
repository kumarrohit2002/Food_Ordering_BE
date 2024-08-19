const Restaurant =require('../models/restaurant.model');
const Address = require('../models/address.model');

module.exports={

    async createRestaurant(req,user){
        try{
            const address=new Address({
                city:req.address.city,
                country:req.address.country,
                fullName:req.address.fullName,
                postalCode:req.address.postalCode,
                state:req.address.state,
                streetAddress:req.address.streetAddress
            })

            const savedAddress=await Address.save();

            const restaurant=new Restaurant({
                address: savedAddress,
                contactInformation:req.contactInformation,
                cuisineType:req.cuisineType,
                descreption:req.descreption,
                images:req.images,
                name:req.name,
                openingHours:req.openingHours,
                registrationDate:req.registrationDate,
                owner:user
            });

            const savedRestaurant=await Restaurant.save();
            return savedRestaurant;


        }catch(error){
            throw new Error(error.message);
        }
    },

    async getRastaurantById(restaurentId){
        try{
            const restaurant = await Restaurant.findById(restaurentId);
            if(!restaurant){
                throw new Error("restaurant not found")
            }
            return restaurant;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async deleteRestaurant(restaurentId){
        try{
            this.findRestaurantById(restaurentId);
            const deletedRestaurant=await Restaurant.deleteById(restaurentId);


        }catch(error){
            throw new Error(error.message);
        }
    },

    async getAllRestautants(){
        try{
            const restaurants=await Restaurant.find();
            return restaurants;
        }catch(error){
            throw new Error(error.message);
        }
    },

    async getRestaurantByUserId(userId){
        try{
            const restaurant=await Restaurant.findOne({owner:userId}).populate('owner').populate('address');
            if(!restaurant){
                throw new Error(`restaurant not found with userId: ${userId}`);
            }

            return restaurant;
        }catch(error){
            throw new Error(error.message);
        }
    },

    async searchRestaurant(keyword){
        try{
            const restaurant=await Restaurant.find({
                $or:[{
                    name:{$regex:keyword , $opations:'i'},
                    description:{$regex:keyword, $opations:'i'},
                    cuisineType:{$regex:keyword,$opations:'i'}
                }]
            });

            return restaurant;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async addToFavorite(restaurantId,user){
        try{
            const restaurant=this.findRestaurantById(restaurantId);

            const dto={
                _id:restaurant._id,
                title:restaurant.name,
                images:restaurant.images,
                descreption:restaurant.descreption
            }

            const favorites=user.favorites || [];

            const index=favorites.findIndex(favorites=>favorites._id===restaurantId);

            if(index!==-1){
                favorites.splice(index,1)
            }else{
                favorites.push(dto);
            }

            user.favorites=favorites;
            await user.save();

            return dto;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async updateRestaurantStatus(id){
        try{
            const restaurant=await Restaurant.findById(id).popolate('owner').populate('address');
            if(!restaurant){
                throw new Error('Restaurant not found');
            }

            restaurant.open= !restaurant.open;
            await restaurant.save();

            return restaurant;

        }catch(error){
            throw new Error(error.message);
        }
    }

}