const asyncHandler = require("express-async-handler");
const Chat = require("../modals/chatModal");



const accessChat = asyncHandler(async (req, res) => {
const {userId } = req.body;
if(!userId){
    console.log("userId param is not sent with request");
    return res.sendStatus(400)
}

var isChat = await Chat.find({
    isGroupChat:false,
})
})
