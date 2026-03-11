const jwt=require("jsonwebtoken")
 


module.exports.isLogin=async function(req,res,next){
try{

    if(!req.cookies.token)
    {
        return res.json({massege:"you have to login first to take a apointment"})
    }

    const decoded=jwt.verify(req.cookies.token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    req.role=decoded.role;
    next();
}
catch(err){
return res.json({massage:"you not logined"});
}
}
module.exports.isAdmin=async function(req,res,next){
    try
    {
        if(!req.userId){
            return res.status(401).json({massage:"you have to login first"});
        }
        if(req.role=="user")
        {
            return res.json({massage:"you not a admin"})
        }
        next();
    }
    catch(err){
        return res.status(500).json({massage:"server error"})
    }
}