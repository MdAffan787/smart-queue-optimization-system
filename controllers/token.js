const tokenModel = require("../models/token");
const dailyCounter = require("../models/counter");
let avergeTime=5;
const createToken=async(req,res)=>{
    const user=await tokenModel.findOne({userId:req.userId,status: { $in: ["waiting", "serving"] }})
   try{
     if(user)
    {
       return res.status(400).json(
        {message:"only one token for one user"}
       )
    }
    const today = new Date().toISOString().split("T")[0];
   const counter=await dailyCounter.findOneAndUpdate(
     { date: today },
  { $inc: { seq: 1 } },
  { new: true, upsert: true }
   )
   const nextSeq=counter.seq
   const token= await tokenModel.create({
    tokenNumber:nextSeq,
   userId : req.userId,
   estimatedWaitTime:(nextSeq*avergeTime),//i will fix it later
    })
    console.log(token)
  
   }
   catch(err){
    console.log(err);
    return res.status(500).json(
        {message:err}
       )
    
   }
}

module.exports={
    createToken,
}