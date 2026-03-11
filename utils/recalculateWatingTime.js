const tokenModel = require("../models/token");

const AVERAGE_TIME = 5; // minutes

const recalculateWaitTime=async ()=>{
    const waitingTokens = await tokenModel
    .find({ status: "waiting" })
    .sort({ tokenNumber: 1 });


    for (let i = 0; i < waitingTokens.length; i++) {
    waitingTokens[i].estimatedWaitTime = (i + 1) * AVERAGE_TIME;
    await waitingTokens[i].save();
  }
};

module.exports = recalculateWaitTime;

