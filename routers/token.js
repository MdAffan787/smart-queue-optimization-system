const express=require("express");
const { createToken } = require("../controllers/token");
const { isLogin } = require("../midleware/auth");

const router=express.Router();

router.get("/create",isLogin,createToken);


module.exports = router;
