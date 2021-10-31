const User = require('../model/userSchema');
const jwt = require("jsonwebtoken");


const authentication = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        console.log(rootUser);
        if(!rootUser)
        {
            throw new Error("user not found");
        }
        else
        {
            req.rootUser = rootUser;
            req.userId = rootUser._id;
            next();
        }
    } catch(e){
        res.status(401).send("unauthorized, no token");
    }
}

module.exports = authentication;