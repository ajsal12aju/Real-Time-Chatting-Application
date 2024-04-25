const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please Enter all the  feild");
  }
  const userExisits = await User.findOne({ email });
  if (userExisits) {
    res.status(400);
    throw new Error("user is allready has exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
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
    throw new Error("user is not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalied user name and password done");
  }
});


const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search ? {
    $or:[
      {name : {$regex: req.query.search, $options : "i"}},
            {email : {$regex: req.query.search, $options : "i"}},
    ]
  }: {};
  const users = await User.find(keyword)
  .find({_id : {$ne : req.user._id}})
  res.send(users);
})


module.exports = { registerUser, authUser, allUsers };
