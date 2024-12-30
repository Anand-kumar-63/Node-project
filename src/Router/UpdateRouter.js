const express = require("express");
const userModel = require("../models/userschema");
const { validatetheupdatedata } = require("../utils/validation.js");
const { auth } = require("../Auth/userauth");
const UpdateRouter = express.Router();

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
    cosole.log(loggedinuser);
    
    object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body(key)));

    console.log(loggedinuser);

    await loggedinuser.save();
    res.json({
      message: `${loggedinuser.FirstName}:updated usccesfully`,
      saveddata: loggedinuser,
    });}
  }
   catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

module.exports =  UpdateRouter ;
