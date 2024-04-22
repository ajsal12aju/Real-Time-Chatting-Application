const jwt = require("jsonwebtoken");
const User = require("../modals/userModel.js");
const asyncHandler = require("express-async-handler");

const product = asyncHandler (async (req, res, next ) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
        } catch (error) {
            
        }
    }
})