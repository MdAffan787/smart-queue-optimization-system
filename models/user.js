const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
})
    const userModel=mongoose.Model("user",userSchema);
    module.exports=userModel;
    


