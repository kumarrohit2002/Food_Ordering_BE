const User=require('../models/user.model');
const {getUserIdFromToken}=require('../config/jwtProvider');
const bcrypt=require('bcrypt');

module.exports={
    async createUser(userData){
        try{
            let {fullName,email,password,role} = userData;
            const isUserExist =await User.findOne({email: email});

            if(isUserExist){
                throw new Error(`User ${fullName} already exists`);
            }

            password=await bcrypt.hash(password,8);

            const user=await User.create({
                fullName,
                email:email,
                password:password,
                role
            });

            return user;


        }catch(error){
            throw new Error(error.message);
        }
    },

    async getUserByEmail(email){
        try{
            const user=await User.findOne({email});
            if(!user){
                throw new Error(`User not found with email: ${email}`);
            }

            return user;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async findUserById(userId){
        try{
            const user=await User.findUserById(userId).populate("addresses");

            if(!user){
                throw new Error(`User not found with UserId: ${userId}`);
            }
            return user;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async findUserProfileByJwt(jwt){
        try{
            const userId=await getUserIdFromToken(jwt);
            const user=await this.findUserById(userId);

            return user;

        }catch(error){
            throw new Error(error.message);
        }
    },

    async findAllUsers(){
        try{

            const users=await User.find();
            return users;

        }catch(error){
            throw new Error(error.message);
        }
    }
}