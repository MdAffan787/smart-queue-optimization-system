const mongoose=require("mongoose")
const tokenSchema=mongoose.Schema({
    
    tokenNumber:Number,
    userId:
    {
        type:mongoose.Types.ObjectId,
    },
    status:{
        type:String,
        enum:["waiting","serving","done","cancelled", "skipped"],
        default:"waiting"
    },
    createdAt:{
        type:Number,
        default:Date.now,
    },
     estimatedWaitTime:Number,
},{timestamps:true})
    const tokenModel=mongoose.model("counter",tokenSchema);
    module.exports=tokenModel;
    
