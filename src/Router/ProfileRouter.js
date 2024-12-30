const express = require("express");
const {auth}= require("../Auth/userauth");
const cookieparser = require("cookie-parser");
const ProfileRouter = express.Router();

ProfileRouter.use(cookieparser());

ProfileRouter.get("/profile", auth , async (req, res) => {
  try {
    // // req.cookies is an object  containing the jwt token
    // const cookies = req.cookies;
    // // extracting the jwt token from the object 
    // const token = cookies?.JWToken; 
    // if (!token) {
    //   return res.status(401).send("Token not found");
    // }
    // const decodingUser = jwt.verify(token, process.env.JWT_SECRET || "hulk@131974");
    // console.log(decodingUser);
    // const { _id } = decodingUser;
    // // finding the object usind the id::
    // const user = await userModel.findById(_id)
    const user = req.user;
    res.send(`Logged-in user ID is:${user}`);
  } 
  catch (error) {
  console.error("Error verifying token:", error.message);
  res.status(401).send(error.message)                           ;
  }
});
module.exports = ProfileRouter;

