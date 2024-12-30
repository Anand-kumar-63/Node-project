const express = require("express");
const { validatetheuserdata } =  require("../utils/validation.js");
const bcrypt = require("bcrypt");
const userModel = require("../models/userschema.js");

const AuthRouter = express.Router();
//this express.json converts json into js object 
AuthRouter.use(express.json());
// req.body is a js object which is created by the middleware expres.json()

AuthRouter.post("/Signup", async (req, res) => {
  // req.body contains js objects
  try {
    validatetheuserdata(req);
    const { FirstName, LastName, Password, Email, Age } = req.body;
    const PasswordHash = await bcrypt.hash(Password, 10);
    console.log(PasswordHash);
    // creatin new instcance of the modle
    const user = new userModel({
      FirstName,
      LastName,
      Password: PasswordHash,
      Email,
      Age,
    });

    console.log(user);
    await user.save();
    console.log("save");
    res.send("data is added successfully");
  } catch (err) {
    console.log("Error", err);
    res.status(404).send("there is some error data is not added");
  }
});
// login authentication
AuthRouter.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //use findone instead of find >> it returns an object instead of array of objects
    // const user = await userModel.findOne({ Email: Email});
    const user = finduser(Email);
    console.log(user.Password);
    if (!user) {
      throw new Error("user is not in the db");
    } 
    else {
      // const isvaliduser = await bcrypt.compare( Password , user.Password);
      const isvaliduser = user.verifyPassword(Password);
      if (isvaliduser) {
      // this jwt token store the id of the user logged in and private key you have multiple options as well to pass in like expirey date and more
    //  const jwtToken = jwt.sign({_id:user._id},"hulk@131974",{
    //   expiresIn:"1d"
      //  })
        const jwtToken = user.getJWT(); 
        res.cookie("JWToken", jwtToken);
        res.send("login succesfull");   
       }
     }
  } 
  catch (err) {
    res.send(err.message);
  }
});

module.exports = AuthRouter;