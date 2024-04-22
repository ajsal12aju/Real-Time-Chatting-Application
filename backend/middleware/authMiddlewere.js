const jwt = require("jsonwebtoken");
const User = require("../modals/userModel.js");
const asyncHandler = require("express-async-handler");

const Protect = asyncHandler (async (req, res, next ) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401)
            res.send("you are not autharized")
            throw new Error("Not Autharaized , no token")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not Autharaized , no token");
    }
})

module.exports = { Protect };