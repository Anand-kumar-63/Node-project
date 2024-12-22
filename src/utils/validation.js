function validatetheuserdata(req) {
  const { Firstname, LastName, Password, Email, Age, Gender } = req.body;

  if (!Firstname || !Lastname || !Email || !Password) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(Email)) {
    throw new Error("Invalid Email" + Email);
  } else if (validator.isStrongPassword(Password)) {
    throw new Error("Password is not Strong" + Password);
  }
}
module.exports = validatetheuserdata;