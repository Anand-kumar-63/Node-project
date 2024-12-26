
const validator = require("validator");

function validatetheuserdata(req) {
  const { FirstName, LastName, Password, Email } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(Email)) {
    throw new Error("Invalid Email" + Email);
  }
  if (!validator.isStrongPassword(Password)) {
    throw new Error("Password is not strong: " + Password);
  }
}
module.exports = {validatetheuserdata};
