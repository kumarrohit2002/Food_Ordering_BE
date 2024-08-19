const express = require('express');
const cors=require('cors');
const bodyParser = require('body-parser');

const app=express();
app.use(cors());
app.use(bodyParser.json());


const authRouter=require('./routes/authRoutes');
app.use('/auth',authRouter);




app.use('/',async(req,res)=>{
    res.send("Server is start");
})

module.exports={app};