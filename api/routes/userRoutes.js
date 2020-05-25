const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


//GET - Returns the current user information
router.route("/").get(userCtrl.getUser);




module.exports = router;