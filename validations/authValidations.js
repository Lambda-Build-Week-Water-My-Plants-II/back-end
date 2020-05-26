const stringValidation = ({ username, password }) => {
  return Boolean(
    username &&
      password &&
      typeof password === "string" &&
      typeof username === "string"
  );
};


const validateNumber = (phoneNum) => {
  if (typeof phoneNum !== "string") {
    return false;
  } else {
    var regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    if (regex) {
      let newStr = phoneNum.replace(/[()]/g, "");
      return true;
    } else {
      return false;
    }
  }
};
module.exports = {
  stringValidation,
  validateNumber,
};
