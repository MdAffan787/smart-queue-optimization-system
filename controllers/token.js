const tokenModel = require("../models/token");
const dailyCounter = require("../models/counter");
const recalculateWatingTime = require("../utils/recalculateWatingTime");
const { getIO } = require("../sockets/socket");

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
   estimatedWaitTime:((nextSeq)*avergeTime),//i will fix it later
    })
    res.status(201).json(token)
   }
   catch(err){
    console.log(err);
    return res.status(500).json(
        {message:err}
       )
    
   }
}

const serveNext=async(req,res)=>{
    try{
        await tokenModel.findOneAndUpdate({ status:"serving" },
            {
                status:"done"
            }
        )
        const nextToken = await tokenModel.findOneAndUpdate(
      { status: "waiting"},
      { status: "serving"},
      { sort: { createdAt: 1 }, new: true }
    );
    if(!nextToken)
    {
        res.status(201).json({massage:"No tokens in queue"})
    }
     

     await recalculateWatingTime();
     const io = getIO();
    io.emit("queueUpdated");

    res.status(200).json({
      message: "Now serving next token",
      token: nextToken
    });
    
    }
    catch(err)
    {
        res.status(501).json({massege:`server error is ${err}`})
    }
}
const cancelToken = async (req, res) => {
    try{
   const token= await dailyCounter.findOneAndUpdate({
        userId:req.userId,
        status:{$in:["waiting", "serving"]},
    },
        { status: "cancelled" },
      { new: true }
    );
    if(!token)
    {
        res.status(404).json("token not founded")
    }
    await recalculateWatingTime();
    res.status(201).json("token cancelled")
    }
catch(err){
res.status(500).json({massege:"server error"})
}
}
const skipToken=async (req,res)=>{
    try{
        const token= await dailyCounter.findOneAndUpdate(
       
       {status: "serving"},
       { status: "skipped" },
       { new: true }
    );
    
    const nextToken = await tokenModel.findOneAndUpdate(
      { status: "waiting"},
      { status: "serving"},
      { sort: { createdAt: 1 }, new: true }
    );
    if(!nextToken)
    {
        res.status(201).json({massage:"No tokens in queue"})
    }
     await recalculateWatingTime();

    res.status(200).json({
      message: "skipped the current one and serving next token",
      token: nextToken
    });

    }
    catch(err)
    {
res.status(500).json({massege:"server error"})

    }
}

module.exports={
    createToken,
    serveNext,
    cancelToken,
    skipToken,
}