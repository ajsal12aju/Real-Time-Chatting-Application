const asyncHandler = require("express-async-handler");
const Chat = require("../modals/chatModal");
const User = require("../modals/userModel");



const accessChat = asyncHandler(async (req, res) => {
const {userId } = req.body;
if(!userId){
    console.log("userId param is not sent with request");
    return res.sendStatus(400)
}

var isChat = await Chat.find({
  isGroupChat: false,
  $and: [
    { users: { $elemMatch: { $eq: req.user._id } } },
    { users: { $elemMatch: { $eq: userId } } },
  ],
}).populate("users", "-password").populate("latestMessage");

isChat = await User.populate(isChat, {
    path:'latestMessage.sender',
    select:"name pic email"
});

if(isChat > 0){
  res.send(isChat[0])
}

})
