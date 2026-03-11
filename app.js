
require("dotenv").config();

const express=require("express");
const app=express();
const http=require("http");
const server=http.createServer(app);
const { initSocket } = require("./sockets/socket");
app.use(express.urlencoded({extended:true}));
app.use(express.json())

initSocket(server);

const mongooseConnection=require("./config/mongooseConnection.js")

const cookieParser=require('cookie-parser');
app.use(cookieParser());
const path=require('path');
app.set("view engine","ejs");


//router import
const userRouter=require("./routers/user.js")
const tokenRouter=require("./routers/token.js")
const adminRouter=require("./routers/admin.js");
const { isAdmin } = require("./midleware/auth.js");

mongooseConnection();

//router use
app.use("/user",userRouter)
app.use("/token",tokenRouter)
app.use("/admin",isAdmin,adminRouter)



app.get("/",(req,res)=>{
    res.status(201).json({massage:"home page"})
})
server.listen(3000,function()
{
    console.log("its running!");
})
