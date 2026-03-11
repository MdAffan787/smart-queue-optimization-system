const tokenModel = require("../models/token");



const getAdminStats=async (req,res)=>{
try
{
    
    const todayStart=new Date();
    todayStart.setHours(0,0,0,0);

    const todayEnd=new Date();
    todayEnd.setHours(23,59,59,999);



    const totalTokens=tokenModel.countDoucument({
        createdAt:{ $gte: todayStart, $lte: todayEnd},
    });
    const servedTokens=tokenModel.countDoucument({
        status:"done",
         createdAt: { $gte: todayStart, $lte: todayEnd },
    })
    const cancelledTokens =tokenModel.countDoucument({
        status:{$in:["cancelled", "skipped"]},
        createdAt: { $gte: todayStart, $lte: todayEnd },
        
    })

    const avgWait = await tokenModel.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: null,
      avgWaitTime: { $avg: "$estimatedWaitTime" },
    },
  },
]);

 res.json({
      totalTokens,
      servedTokens,
      cancelledTokens,
      averageWaitTime:
        avgWait.length > 0 ? Math.round(avgWait[0].avgWaitTime) : 0,
    });
}

catch(err)
{
res.status(500).json({massege:"server error"});
}
}

module.exports={
    getAdminStats
}