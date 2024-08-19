const {generateToken} =require('../config/jwtProvider');
const userService=require('../service/userService');
const bcrypt=require("bcrypt");

const register=async(req,res)=>{
    try{
        const user=await userService.createUser(req.body);
        const jwt=generateToken(user._id);
        // await cartService.CreateCart(user);

        return res.status(201).send({jwt,message:"register success",user});

    }catch(error){
        return res.status(500).send({error: error.message});
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await userService.getUserByEmail(email);

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).send({message:"Invalid Password"});
        }

        const token=await generateToken(user._id);

        return res.status(200).send({token,message:"Login success",user});

    }catch(error){
        return res.status(500).send({error:error.message});
    }
}

module.exports={register,login};