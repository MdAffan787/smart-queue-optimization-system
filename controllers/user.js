const userModel = require("../models/user");




 const createUser= async(req,res)=>{
    const {name,email,phone}=req.body;
    await userModel.create({
        name,
        email,
        phone,
    })
res.stutus(201).json({created:"successfully"})

}



module.exports={
    createUser,
}