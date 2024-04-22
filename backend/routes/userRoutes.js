const express = require('express')
const {registerUser, authUser, allUsers} = require("../controllers/userControllers.js")
const { product } = require("../middleware/authMiddlewere.js");
const router = express.Router()


router.route("/").post(registerUser).get(product, allUsers);
router.post('/login', authUser)

module.exports = router