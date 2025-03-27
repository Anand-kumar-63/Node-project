const express = require("express");
const { validatetheuserdata } =  require("../utils/validation.js");
const bcrypt = require("bcrypt");
const userModel = require("../models/userschema.js");
const finduser = require("../models/userschema.js");
const AuthRouter = express.Router();
const cors = require("cors")
//this express.json converts json into js object 
AuthRouter.use(express.json());
// req.body is a js object which is created by the middleware expres.json()

// signup api
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
    res.json({message:"data is added successfully",user});
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
    // const user = finduser(Email);
    // const user = await userModel.findOne({ Email: Email });
    const user = await userModel.schema.methods.finduser(Email);
    // const user = await userModel.finduser(Email);
    console.log(user.Password);
    if (!user) {
      throw new Error("user is not in the db");
    } 
    else {
      // const isvaliduser = await bcrypt.compare( Password , user.Password);
      const isvaliduser = await userModel.schema.methods.verifyPassword(Password,user);
      if (isvaliduser) {
        const jwtToken = userModel.schema.methods.getJWT(user); 
        res.cookie("JWToken", jwtToken);
        res.send(user);   
       }
     }
  } 
  catch (error) {
    res.status(404).send(error.message);
  }
});

AuthRouter.post("/logout", async(req,res)=>{ 
  const cookie = req.cookies;
  // to clear the cookie during logout 
  // res.clearCookie("JWTtoken");
  res.cookie("JWTtoken", null ,{
    expires: new Date(Date.now())
  })
  res.send("Logged out succesfull");
})


module.exports = {AuthRouter , };