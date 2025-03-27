const userModel = require("../models/userschema");
const validator = require("validator");

function validatetheuserdata(req) {
  const { FirstName, LastName, Password, Email } = req.body;

  if (!FirstName || !LastName || !Email || !Password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(Email)) {
    throw new Error("Invalid Email" + Email);
  }
  // if (!validator.isStrongPassword(Password)) {
  //   throw new Error("Password is not strong: " + Password);
  // }
}
// to validate the data to get updated
function validatetheupdatedata(req) {
  const ALLOWED_UPDATES = [
    "PhotoURL",
    "FirstName",
    "LastName",
    "Gender",
    "Password",
    "profession",
    "_id",
    "Age",
    "Location",
    "Skills",
  ];
const isvalidupdatedata = Object.keys(req.body).every(k => ALLOWED_UPDATES.includes(k));
 return isvalidupdatedata;
}
module.exports = { validatetheuserdata, validatetheupdatedata };
