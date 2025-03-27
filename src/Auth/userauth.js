const jwt = require("jsonwebtoken")
const userModel = require("../models/userschema");

const auth = async function (req, res, next) {
  try {
    const cookies = req.cookies;
    console.log(cookies);
    const token  = cookies?.JWToken;
    if (!token) {
      res.status(401).send("Please Login!");
    }

    const decodetoken = await jwt.verify(token,process.env.JWT_SECRET || "hulk@131974");
    const { _id } = decodetoken;
    if (!_id){
      throw new Error("id is not present");
    } 
      console.log(_id);
      const user = await userModel.findById(_id);
      
      if (!user) {
        throw new Error("user object is empty");
      }
      // this is the logged in in user 
      req.user = user;
      console.log(user);  
      next();
  } 
  catch (error) {
    res.status(401).send(error.message);
   }
};
module.exports = { auth };
