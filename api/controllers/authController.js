const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isValid = require("../../validations/authValidations");
const Users = require("./helpers/authHelper");

//POST - Registers new user
module.exports.registerUser = async (req, res) => {
  let { username, password, phone_number } = req.body;
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

    try {
      const userInfo = {
        username,
        password,
        phone_number,
      };
      const newUser = await Users.registerUser(userInfo);
      if (newUser.username) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({ message: newUser.message });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

//POST - Login user
module.exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!isValid.stringValidation(req.body)) {
    res.status(400).json({
      message: "Please provide username, password",
    });
  } else {
    //find user by username
    const [user] = await Users.findBy({ username });
    try {
      if (user && bcrypt.compareSync(password, user.password)) {
        //create jwt payload
        const payload = {
          sub: user.id,
          username: user.username,
          phone_number: user.phone_number,
        };
        //jwt options
        const options = {
          expiresIn: "1d",
        };
        //get the jwt secret from env
        const jwtSecret = process.env.JWT_SECRET;
        //jwt sign token
        jwt.sign(payload, jwtSecret, options, (err, token) => {
          if (err) {
            return res.status(400).json({ msg: err });
          }
          res.status(200).json({
            success: true,
            token,
            id: user.id,
            // username: user.username,
            // phone_number: user.phone_number,
          });
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
