const express=require("express");
const { createToken } = require("../controllers/token");

const router=express.Router();

router.get("/create",createToken);


module.exports = router;
