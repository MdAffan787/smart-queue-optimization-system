const express=require("express");
const { createUser } = require("../controllers/user");
const { isLogin } = require("../midleware/auth");
const { cancelToken } = require("../controllers/token");

const router=express.Router();


router.post("/create",createUser)
router.post("/cancel", isLogin, cancelToken);

module.exports = router;

