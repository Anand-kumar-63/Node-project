const express = require("express"); 
const app = express();
require("./config/database.js");
const userModle = require("./models/user.js")
const datacall  = require("./config/database.js");
// req handler
// app.use("/about",(req,res)=>{
//   res.send("hey there i got you mr. /about");
// });
// app.get("/u/",(req,res)=>{
//   res.send("hey you got the data");
// });
// app.get("/want",(req,res,next)=>{
//   res.send("hey there you want something??");
// });
// app.delete("/del",(req,res)=>{
//   res.send("hey data deleted");
// });
// app.post("/post",(req,res)=>{
//   res.send("data posted");
// });
// //  a req handler can have multiple route handler
// app.use("/help",(req,res,next)=>{
//     res.send("hey there i am your help");
//     next();
// });
// app.use(("/help"),(req,res,next)=>{
//   // res.send("help1");
//   console.log("help mil gyi 1");
//   next();
// },
// (req,res,next)=>{
//   console.log("help mil gyi 2");
//   // res.send("help2");
//   next();
// },
// (req,res,next)=>{
//   res.send("help3");
//   console.log("help mil gyi 3");
// },)
// app.use("/hey",(req,res)=>{
//   console.log("heyyyyy")
//   // there is no response 
// })
// app.use("/ab",(req,res,next)=>{
//   res,send('hey')
// })

app.post("/signup",async (req,res)=>{
  // const userobj ={
  // FirstName:"Nemesis",
  // LastName:"NaN",
  // Age:"69",
  // Gender:"male",
  // Profession:"software developer",
  // Location:"gonda"
  // } 
  const user = new userModle({
    FirstName: "Temp"
  });
  await user.save();

  console.log(user);
  res.send("Document is uploaded usccesfully")

});

datacall()
.then(() =>{
  console.log("database connected succesfulyy");
  app.listen( 7777 , ()=>{
    console.log("hey your server is running succesfullyy on port 7777...")
  });
})
.catch((err)=>{
  console.error("heyy there is an error");
})



