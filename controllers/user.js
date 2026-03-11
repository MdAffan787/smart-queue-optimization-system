const userModel = require("../models/user");
const { genrateToken } = require("../utils/genrateToken");




 const createUser= async(req,res)=>{
    let {name,email,phone}=req.body;
   const user= await userModel.create({
        name,
        email,
        phone,
    })
    const token=await genrateToken(user);
    res.cookie("token",token);
res.status(201).json({created:"successfully"})

}



module.exports={
    createUser,
}