const express = require("express");
const server = express();
server.listen("4000",()=>{
  console.log("hey you server is succesfully runnig on port number 4000");
})

server.use("/help",(err,req,res,next)=>{
  if(err){
    res.status(404).send("hey there is some error");
  }
})

server.use(("/help/please"),(err,req,res,next)=>{
  throw new Error("hey there is an error");
})


server.use(("/help/please"),(err,req,res,next)=>{
 
})



