const mongoose=require("mongoose")
const tokenSchema=mongoose.Schema({
    
    tokenNumber:Number,
    userId:
    {
        type:mongoose.Types.ObjectId,
    },
    status:{
        type:String,
        enum:["waiting","serving","done"],
        default:"waiting"
    },
    createdAt:{
        type:Number,
        default:Date.now,
    },
     estimatedWaitTime:Number,
},{timestamps:true})
    const tokenModel=mongoose.Model("counter",tokenSchema);
    module.exports=tokenModel;
    
