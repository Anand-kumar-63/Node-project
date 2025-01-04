const express = require("express");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequestSchema");
const { auth } = require("../Auth/userauth");
const userModel = require("../models/userschema");

// for populate the data
const USER_DATA_STRING = "FirstName LastName Age Gender";
userRouter.get("/user/requests/received", auth, async (req, res) => {
  try {
    const loggedinuser = req.user;
    const requests = await connectionRequestModel
      .find({
        ReciverId: loggedinuser._id,
        Status: "interested",
      })
      .populate("SenderId", USER_DATA_STRING);
    res.json({
      message: "REQUEST RECIEVED",
      requests,
    });
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});

userRouter.get("/user/connections", auth, async (req, res) => {
  const loggedinuser = req.user;
  try {
    const connections = await connectionRequestModel
      .find({
        $or: [
          { SenderId: loggedinuser._id, Status: "accepted" },
          { ReciverId: loggedinuser._id, Status: "accepted" },
        ],
      })
      .populate("SenderId", USER_DATA_STRING)
      .populate("ReciverId", USER_DATA_STRING);

    // for showing the data of only the one who is on the other side of the request be it Sender Or Reciver who is sending the request and get accepted or be the one whom the user have sendded the connection request and get accepted
    const data = connections.map((row) => {
      if (row.SenderId._id.equals(loggedinuser._id)) {
        return row.ReciverId;
      } else {
        return row.SenderId;
      }
    });
    console.log(data);
    res.json({
      message: " USERS CONNNECTIONS ",
      data,
    });
  } catch (err) {
    res.status(404).send("ERROR:" + err.message);
  }
});

userRouter.get("/feed",auth,async(req,res)=>{
try{
  const loggedinuser = req.user;
  const feed = await userModel.find({
    _id:if(_id)
  })
}
catch(err){
  res.status(404).send("ERROR:" + err.message);
}


})
module.exports = userRouter;
