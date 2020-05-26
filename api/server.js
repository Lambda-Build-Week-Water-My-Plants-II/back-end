const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");

//auth middlelware
//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const server = express();

server.use(helmet());
//config body parser
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
// passport middleware
server.use(passport.initialize());

//passport config
require("../config/passport.js")(passport);

//config routes
server.get("/", (req, res) => {
  res.status(200).json({ api: "its alive!" });
});

server.use("/api/auth", authRoutes);
//use passport to protect endpoints
const requireLogin = passport.authenticate("jwt", { session: false });
server.use("/api/user", requireLogin, userRoutes);

module.exports = server;
