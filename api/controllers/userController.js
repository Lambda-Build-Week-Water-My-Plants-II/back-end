const Users = require("./helpers/userHelper");

//GET - gets the current user information
module.exports.getUser = async (req, res) => {
  const { username, id, phone_number } = req.user;
  try {
    const foundUser = await Users.findById(Number(id));
    if (Number(id) === Number(foundUser.id)) {
      res.status(200).json({ username, id, phone_number });
    } else {
      res.status(404).json({ msg: "Please log in" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error has occured", err: err.message });
  }
};
