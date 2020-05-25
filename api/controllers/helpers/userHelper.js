const db = require("../../../data/dbConfig");


const findById = (userID) => {
  return db("users").where({ id: userID }).first();
};



module.exports =  {
  findById,
}