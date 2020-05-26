const db = require("../../../data/dbConfig");

const findById = (userID) => {
  return db("users").where({ id: userID }).first();
};

const updateUser = async (userInfo) => {
  const userObj = {
    username: userInfo.username,
  };
  //check to see if username already exists
  if (userInfo.username) {
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
      return updateQuery(userInfo);
    }
  } else {
    return updateQuery(userInfo);
  }
};

const updateQuery = async (obj) => {
  try {
    const [userId] = await db("users")
      .where({ id: obj.id })
      .returning("id")
      .update(obj);
    return findById(Number(userId));
  } catch (err) {
    throw err;
  }
};

const findBy = (obj) => {
  return db("users").where(obj);
};

const deleteUser = (id) => {
  return db("users").where({ id }).returning("id").del();
};

module.exports = {
  findById,
  updateUser,
  deleteUser,
};
