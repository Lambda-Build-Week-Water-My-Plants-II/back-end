const db = require("../../../data/dbConfig");

const findById = (userID) => {
  return db("users").where({ id: userID }).first();
};

const updateUser = async (userInfo) => {
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
      const [userId] = await db("users")
        .where({ id: userInfo.id })
        .returning("id")
        .update(userInfo);
      return findById(Number(userId));
    } catch (err) {
      throw err;
    }
  }
};

// const updateUserName = async ()

const findBy = (obj) => {
  return db("users").where(obj);
};

module.exports = {
  findById,
  updateUser,
};
