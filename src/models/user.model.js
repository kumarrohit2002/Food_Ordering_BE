const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:["ROLE_CUSTOMER","ROLE_RESTAURANT_OWNER"],
        default:"ROLE_CUSTOMER"
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    },],

    favorites:[{name:String,decreption:String,images:[]}],

    addresses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },]
})

const User=mongoose.model('User',UserSchema);

module.exports=User;