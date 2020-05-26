const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");


//GET - Returns the current user information
router.route("/").get(userCtrl.getUser);
//PUT - Updates user information
router.route("/:userId").put(userCtrl.updateUser);
//DELETE - Delete user account
router.route("/:userId").delete(userCtrl.deleteUser);


module.exports = router;