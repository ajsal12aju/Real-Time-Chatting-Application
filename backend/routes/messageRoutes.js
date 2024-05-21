
const express = require("express");
const { Protect } = require("../middleware/authMiddlewere.js");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers.js");
const router = express.Router();
router.route("/").post(Protect, sendMessage);
// router.route("/:chatId").get(Protect, allMessages);


module.exports = router;