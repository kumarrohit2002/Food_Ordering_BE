const {app}=require('.');
const db=require('./config/db');


require("dotenv").config();

const PORT=process.env.PORT

app.listen(PORT,async()=>{
    db.connect();
    console.log(`Server is Lisining on url: http://localhost:${PORT}`);
})