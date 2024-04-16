const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel")
const generateToken = require("../config/generateToken")
const registerUser = asyncHandler(async (req, res)=>{
    const {name, email, password, pic} = req.body

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("please Enter all the feild")
    }
const userExisits =  await User.findOne({email})
    if(userExisits){
        res.status(400);
        throw new Error("user is allready exists")
    }

    const user = await User.create({
        name,
        email,
        password,
         pic
    })  

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:email,
            pic: user.pic,
            token: generateToken(user._id)
        });

    }else{
        res.status(400);
        throw new Error("user not found")
    }

    })

    const authUser = asyncHandler(async (req, res)=>{
        const {email, password} = req.body
const user = await User.create({
  email,
});  

         if (user) {
           res.status(201).json({
             _id: user.id,
             name: user.name,
             email: email,
             pic: user.pic,
             token: generateToken(user._id),
           });
         } else {   
           res.status(400);
           throw new Error("Invalied user name and passwordd");
         }
    })

    module.exports = {registerUser}