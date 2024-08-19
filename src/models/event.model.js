const mongoose=require('mongoose');

const EventsSchema = new mongoose.Schema({
    image:String,
    startedAt:String,
    endsAt:String,
    name:String,
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restautant",
    },
    location:String,
})

const Events=mongoose.model('Events', EventsSchema);

module.exports=Events;