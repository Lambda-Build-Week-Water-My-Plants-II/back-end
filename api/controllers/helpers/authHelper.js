const db = require("../../../data/dbConfig");

//Registers a new user
const registerUser = async (userInfo) => {
  const userObj = {
    username: userInfo.username,
  };
  //check to see if username already exists
  const [existingUser] = await findBy(userObj);
  if (existingUser) {
    //if existing user exists do a check of id
    const compareId = await findById(Number(existingUser.id));
    if (Number(compareId.id) === Number(existingUser.id)) {
      return {
        message: "Username is unavailable, please choose another",
      };
    }
  } else {
    try {
      const [newUserId] = await db("users").returning("id").insert(userInfo);
      return findById(Number(newUserId));
    } catch (err) {
      throw err;
    }
  }
};

const findById = (userID) => {
  return db("users").where({ id: userID }).first();
};

const findBy = (obj) => {
  return db("users").where(obj);
};

module.exports = {
  registerUser,
  findBy,
  findById
}