const express=require("express");
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())


const mongooseConnection=require("./config/mongooseConnection.js")

const cookieParser=require('cookie-parser');
app.use(cookieParser());
const path=require('path');
app.set("view engine","ejs");


//router import
const userRouter=require("./routers/user.js")
const tokenRouter=require("./routers/token.js")

mongooseConnection();

//router use
app.use("/user",userRouter)
app.use("/token",tokenRouter)



app.get("/",(req,res)=>{
    res.json({massage:"home page"})
})
app.listen(3000,function()
{
    console.log("its running!");
})
