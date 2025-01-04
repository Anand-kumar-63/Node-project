const express = require("express");
const {auth } = require("../Auth/userauth");
const connnectionRequestModel = require("../models/connectionRequestSchema");
const connectionsRouter = express.Router();

connectionsRouter.gte("/user/connections",auth , async(req,res)=>{
try{
  const loggedinuser = req.user;
  const connections = await connectionRequestModel.find({
    Status:"accepted"
  })
  
}
catch(err){
  res.status(400).send("ERRO:"+err.message);
}


})

module.exports = connectionRouter;