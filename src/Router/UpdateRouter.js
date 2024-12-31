const express = require("express");
const userModel = require("../models/userschema");
const { validatetheupdatedata } = require("../utils/validation.js");
const { auth } = require("../Auth/userauth");
const UpdateRouter = express.Router();
const brcypt = require("bcrypt")

UpdateRouter.patch("/update", auth, async (req, res) => {

//const upda = req.body.userId;
//const data = req.body;
//try {
//  validatetheupdatedata(req);
//  console.log(data);
//  const update = await userModel.findByIdAndUpdate({ _id: upda }, data);
//  res.status(200).send(update);
//} catch (err) {
//  res.status(404).send("there is some error in updating the data");
//}
  try {
    if(!validatetheupdatedata(req)){
      throw new error("updation unauthorised")
    }
    else{
    const loggedinuser = req.user;
    Object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body[key]));
    await loggedinuser.save();
    res.json({
      message: `${loggedinuser.FirstName}:updated usccesfully`,
    });}
  }
   catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

UpdateRouter.patch("/Password", auth ,async(req,res)=>{
  try{  const isValidToChange = validatetheupdatedata(req);
  
  const HashPassword = await brcypt.hash(req.body.Password,10)
  req.body.Password = HashPassword;

  const loggedinuser = req.user;
  console.log(loggedinuser);
  console.log(isValidToChange);

  if(!isValidToChange){
    throw new error("Password cannot be changed");
  }
  else{
    Object.keys(req.body).forEach((key)=>(loggedinuser[key] = req.body[key]  ));
    console.log(loggedinuser);
    await loggedinuser.save();
    res.send("Password Change Succesfully");
  }
}
catch(err){
  res.status(404).send(err.message);
}
 
})

module.exports =  UpdateRouter ;
