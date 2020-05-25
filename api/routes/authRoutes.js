const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/authController");

//POST - REGISTER
router.route("/register").post(authCtrl.registerUser);
//POST - LOGIN
router.route("/login").post(authCtrl.loginUser);


module.exports = router;