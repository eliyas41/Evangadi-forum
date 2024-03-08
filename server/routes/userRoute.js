const express = require("express");
const router = express.Router();
//authentication middleware
const authMiddleware = require("../middleware/authMiddleware")
// user controller
const { register, login, checkUser } = require("../controller/userController");

//Register Route
router.post("/register", register);

//Login users
router.post("/login", login);

//Check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;