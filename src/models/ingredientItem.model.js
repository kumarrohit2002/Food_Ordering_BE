const mongoose=require("mongoose");

const IngredientItemSchema=new mongoose.Schema({
    name:String,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"IngredientCategory"
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    inStoke:{
        type:Boolean,
        default:true,
    },
})

const IngredientItem=mongoose.model("IngredientItem",IngredientItemSchema);

module.exports=IngredientItem;