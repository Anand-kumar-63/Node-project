const express = require("express");
const app = express();
const  { userAuth , adminAuth } = require("./Auth/middleware.js");
// middleware to handle User Autherisation
app.use("/admin", adminAuth ,(req,res,next)=>{
  res.send("hey you got the admin man now fuck you!!")
  next();
});

app.get("/admin/getAlldata", (req, res, next) => {
  console.log("heyy you got all the data");
  // res.send("hey you got all the data")
  next();
});

app.get("/admin/deleteAlldata", (req, res, next) => {
  console.log("heyy you delete all the data");
  res.send("hey you got delete all the data");
});

app.get("/user",userAuth,(req,res,next)=>{
  console.log("hey you got the user");
  res.send("hey you got the user")
})

app.listen("7000", () => {
  console.log("application succesfullyy running on port 7000");
});
