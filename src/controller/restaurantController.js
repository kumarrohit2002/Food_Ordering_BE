
const RestaurantService=require('../service/RestaurantService');
const userService=require('../service/userService');

module.exports={
    createRestaurant:async(req,res)=>{
        try{
            const user=req.body;
            const restaurant=await RestaurantService.createRestaurant(req.body,user);
        }catch(error){
            res.status(500).send({error:error.message});
        }
    },

    deleteRestaurantById:async(req,res)=>{
        try{
            const {id}=req.params;
            const user=req.user;

            await RestaurantService.deleteRestaurant(id);

            return res.status(200).send({
                success: true,
                message: 'Restaurant deleted successfully'
            })

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    },

    updateRestaurantStatus:async(req,res)=>{
        try{
            const {id}=req.params;

            const restaurant=await RestaurantService.updateRestaurantStatus(id.toString());

            res.status(200).json({
                success:true,
                message:'restaurant Status updated',
                restaurant
            })

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    },

    findRestaurantByUserId:async(req, res)=>{
        try{
            const user=req.user;
            const restaurant =await RestaurantService.getRestaurantByUserId(user._id);

            res.status(200).json({
                restaurant: restaurant
            })
        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    },

    findRestaurantsByName:async(req, res)=>{
        try{
            const {keyword}=req.query;
            const restaurant=await RestaurantService.searchRestaurant(keyword);

            res.status(200).json({restaurant: restaurant});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    },

    getAllRestautants:async(req,res)=>{
        try{
            const restaurant=await RestaurantService.getAllRestautants(req.query);
            res.status(200).json({restaurant: restaurant});

        }catch(error){
            res.status(500).json({
                success:false,
                error:"Internal server Error"
            })
        }
    },

    findRestaurantById:async(req,res)=>{
        try{
            const {id}=req.params;
            const restaurant=await RestaurantService.getRastaurantById(id);
            res.status(200).json({restaurant: restaurant});

        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    },

    addToFavorite:async(req,res)=>{
        try{
            const {id}=req.params;
            const user=req.user;
            const restaurant=await RestaurantService.addToFavorite(id,user);

            res.status(200).json({restaurant: restaurant});
        }catch(error){
            if(error instanceof Error){
                res.status(400).json({error:error.message});
            }else{
                res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
            }
        }
    }
}