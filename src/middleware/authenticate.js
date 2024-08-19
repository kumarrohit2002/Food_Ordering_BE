
const {getUserIdFromToken}=require('../config/jwtProvider');
const userSevice=require('../service/userService')

const authenticate=async(req,res,next)=>{
    // Bearer token
    try{
        const token =req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"No token provided"});
        }

        const userId=getUserIdFromToken(token);
        const user=await userSevice.findUserById(userId);

        req.user=user;

    }catch(error){
        return res.status(401).json({message:error.message});
    }
    next();
}