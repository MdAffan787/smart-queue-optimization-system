const jwt=require("jsonwebtoken")

module.exports.genrateToken=async function(user){
    return token=jwt.sign(
         { userId: user._id,
            role:user.role,
         },
        process.env.JWT_KEY,
    { expiresIn: "1d" })
}