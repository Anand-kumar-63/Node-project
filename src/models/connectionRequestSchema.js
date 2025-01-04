const mongoose = require("mongoose");
const userModel = require("./userschema");

const connectionRequestSchema = new mongoose.Schema(
{   
  SenderId:{
  type: mongoose.Schema.Types.ObjectId,
  ref:userModel,//ref to users collection
  required:true
  },
  ReciverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:userModel,//ref to users collection
    required:true
  },
  Status:{
   type:String,
   required:true,
   enum:{
    values:["interested","ignored","accepted","rejected"],
    message:"${value} is not valid"
  }
  }  
},
{
  timestamps:true
})
// connectionRequestSchema.index({SenderId:1,ReciverId:1});
// checking if the sender and reciver are same or not 
connectionRequestSchema.pre("save",async function(next){
const connectionRequest = this;
if(connectionRequest.SenderId.equals(connectionRequest.ReciverId))
{  throw new error("CAANNOT SEND REQUEST TO YOURSELF"); }
console.log("Equal condition is checked");
next();
});

const connectionRequestModel = new mongoose.model("connectionRequest",connectionRequestSchema);
module.exports = connectionRequestModel;