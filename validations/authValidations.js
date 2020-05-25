const registerValidation = (user) => {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
};
const loginValidation = (user) => {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
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
  registerValidation,
  loginValidation,
  validateNumber,
};
