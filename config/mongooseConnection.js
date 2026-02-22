const mongoose =require("mongoose");
const config=require('config');
function mongooseConnection(){
mongoose
.connect(`${config.get("MONGODB_URI")}/queueManegment`)
.then(function(){
    console.log("mongoose connected");
})
.catch((err)=>
{
    console.log({massege:err});
})
}

module.exports=mongooseConnection;

