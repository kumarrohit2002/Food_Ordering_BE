const mongoose=require('mongoose');

const FoodSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    foodCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    images:String,
    available:Boolean,
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant",
    },
    isVegtarian:Boolean,
    isSeasonal:Boolean,
    ingredients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"IngredientsItem"
    }],
    creationDate:{
        type:Date,
        default:new Date
    }
})

const Food=mongoose.model("Food",FoodSchema);

module.exports=Food;

