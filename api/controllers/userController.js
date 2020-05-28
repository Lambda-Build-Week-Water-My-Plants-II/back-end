const Users = require("./helpers/userHelper");
const isValid = require("../../validations/authValidations");
const bcrypt = require("bcryptjs");

//GET - gets the current user information
module.exports.getUser = async (req, res) => {
  const { username, id, phone_number } = req.user;
  try {
    //make sure the user matches - another layer of route protection
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

//PUT - Updates the user information
module.exports.updateUser = async (req, res) => {
  let { username, password, phone_number } = req.body;
  const { id } = req.user;
  if (Number(id) !== Number(req.params.userId)) {
    res.status(401).json({ message: "Unauthorized, please login" });
  }
  try {
    //make sure the user matches - another layer of route protection
    const foundUser = await Users.findById(Number(id));
    if (Number(id) === Number(foundUser.id)) {
      //validate inputs
      if (!isValid.stringValidation(req.body)) {
        res.status(400).json({
          message: "Please provide username, password and valid phone number",
        });
      } else if (!isValid.validateNumber(phone_number)) {
        res.status(400).json({
          message:
            "Please enter a valid phone number - example (###)-###-#### or ###-###-####",
        });
      } else {
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        //hash password
        const hash = bcrypt.hashSync(password, rounds);
        password = hash;
        const updatedInfo = {
          username,
          password,
          phone_number,
          id,
        };
        if (req.user.username === req.body.username) {
          const updatedUser = await Users.updateUser({
            password: updatedInfo.password,
            phone_number: updatedInfo.phone_number,
            id,
          });
          if (updatedUser.username) {
            res.status(200).json(updatedUser);
          } else {
            res
              .status(400)
              .json({ message: "Could not update user information" });
          }
        } else if (req.user.username !== req.body.username) {
          const updatedUser = await Users.updateUser(updatedInfo);
          if (updatedInfo.username) {
            res.status(200).json(updatedUser);
          } else {
            res.status(400).json({ message: updatedUser.message });
          }
        }
      }
    } else {
      res.status(404).json({ msg: "Please log in" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error has occured", err: err.message });
  }
};

//DELETE - Deletes the users account
module.exports.deleteUser = async (req, res) => {
  const paramsId = req.params.userId;
  const userId = req.user.id;

  if (Number(paramsId) !== Number(userId)) {
    return res.status(401).json({ message: "Unauthorized, please login" });
  }
  try {
    const [deletedUserId] = await Users.deleteUser(Number(userId));
    if (deletedUserId) {
      res
        .status(200)
        .json({ message: `Deleted user with id of ${deletedUserId}` });
    } else {
      res
        .status(404)
        .json({ message: "Could not find the user with given id" });
    }
  } catch (err) {
    res.status(500).json({ msg: "An error has occured", err: err.message });
  }
};
