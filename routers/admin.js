const express=require("express");
const router=express.Router();
const { serveNext, skipToken } = require("../controllers/token.js");

router.post("/serve-next", serveNext);
router.post("/skip",skipToken);
module.exports = router;
