const express = require("express");
const { auth } = require("../Auth/userauth");
const RequestRouter = express.Router();
const connectionModel = require("../models/connectionRequestSchema")
const userModel = require("../models/userschema");

// api to send the request>>interested , ignored
RequestRouter.post("/Request/send/:Status/:ReciverId", auth, async(req, res) => {
  try {
const SenderId = req.user._id;
const ReciverId = req.params.ReciverId;
const Status = req.params.Status;
// creating the new instance of the model
const connectionRequestmodel = new connectionModel({
  SenderId,
  ReciverId,
  Status
})
// checking status while sending the request to someonne
const validStatus = ["interested","ignored"]
const isvalidStatus = validStatus.includes(Status);
if(!isvalidStatus){
  return res.status(404).send("INVALID STATUS");
}

// if the request is already sent
const ExistingConnectionRequest = await connectionModel.findOne(
{  $or: [
  {
   SenderId,
   ReciverId
  },
  {
   SenderID:ReciverId,
   ReciverId:SenderId
  }
],})
// throw error
if(ExistingConnectionRequest){
  return res.send({
    message:"REQUEST ALREADY EXIST"
  })
}
console.log("all checking has been done except the equal condition");

const data = await connectionRequestmodel.save();
res.status(200).json({
  message:"CONNECTION REQUEST SENT SUCCESSFULLY",
  data
}) }
catch(err)
 {
    res.status(404).send("ERROR:" + err.message);
 }
});

// api to review the request>>accepted , rejected
RequestRouter.post("/Request/Review/:Status/:requestId",auth, async (req,res)=>{
try{ const loggedinuser = req.user;
 console.log(loggedinuser);

// VALIDATION OF THE STATUS
const allowedStatus = ["accepted","rejected"];
if(!allowedStatus.includes(req.params.Status)){
  throw new error("INVALID STATUS");
}
const reqId = req.params.requestId;
console.log(reqId);
// CHECK IF THE REQEUST IS THERER IN THE DATABASE OR NOT
const findtheRequest = await connectionModel.findOne({
  // id of the request stored in the db
  _id:reqId,
  ReciverId:loggedinuser._id,
  Status:"interested"
})
if(!findtheRequest){
  throw new error("ERROR:REQUEST NOT FOUND");
}
// UPDATING THE Status of the requ{est 
findtheRequest.Status = req.params.Status;
console.log(findtheRequest);
await findtheRequest.save();
res.status(404).send({
  message:"Request status updated",
  findtheRequest
})
}
catch(error){
  res.status(404).send("ERROR:"+ error.message);
}
})

module.exports = RequestRouter; 
