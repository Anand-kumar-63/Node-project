const express = require("express");
const app = express();
require("./config/database.js");
const datacall = require("./config/database.js");
const AuthRouter = require("./Router/AuthRouter.js");
const ProfileRouter = require("./Router/ProfileRouter.js");
const UpdateRouter = require("./Router/UpdateRouter.js");  
const chainHandler= require("./Router/chainRouter.js");
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

// Api to handle request at route /signup
// app.post("/postdata", async (req, res) => {
//   try {
//     const user = new userModel(req.body);
//     await user.save();
//     res.send("data is added successfully");
//     console.log(user);
//   } catch (err) {
//     res.status(404).send("there is some error data is not added");
//   }
// });
// app.get("/initial", async (req, res, next) => {
//   // this req.body is a js object which is created by the middleware expres.json()
//   // console.log(req.body);
//   // creating new instance of the usermodel
//   // const user = new userModle(req.body);

//   // extracting the location from the request to filter the data
//   const loc = req.body.FirstName;
//   try {
//     console.log("the fristname is :", loc);
//     const finddocument = await userModel.find({ FirstName: loc });
//     res.send(finddocument);
//     // next();
//   } catch (err) {
//     res
//       .status(404)
//       .send("There is no documnet in tha database matching the filter");
//   }
//   // to add data to the collection passed in model
//   // const user = new userModle( {
//   // FirstName:"Nemesis",
//   // LastName:"NaN",
//   // Age:"69",
//   // Gender:"male",
//   // Profession:"software developer",
//   // Location:"gonda"
//   //   } );

//   // try{
//   //   await user.save();
//   //   res.send("data is added successfully");
//   //   console.log(user);
//   // }
//   // catch(err){
//   //   res.status(404).send("there is some error data is not added");
//   // }
// });
// app.get("/Profession", async (req, res) => {
//   const kaam = req.body.Profession;
//   try {
//     console.log(kaam);
//     const pro = await userModel.find({ Profession: kaam });
//     if (pro.length > 0) {
//       res.send(pro);
//     } else {
//       res.send(404).send("No documnet matches the filter in the collection");
//     }
//   } catch (err) {
//     res.status(404).send("there is no document in the collection user");
//   }
// });
// app.delete("/delete", async (req, res) => {
//   // reading the data from req
//   const del = req.body.FirstName;
//   try {
//     console.log(del);
//     const delet = await userModel.deleteMany({ FirstName: del });
//     if (delet.deletedCount > 0) {
//       res.send(delet);
//     } else {
//       res.status(404).send("No documents matched the filter in the collection");
//     }
//   } catch (err) {
//     res.status(404).send("No document matched to the filter in the collection");
//   }
// });

// databse setup
// 

app.use("/",chainHandler);
app.use("/",AuthRouter);
// route "/" means it will handle all the routes request coming to the server
app.use("/",ProfileRouter);
app.use("/",UpdateRouter);

datacall()
  .then(() => {
    console.log("database connected succesfulyy");
    app.listen(7777, () => {
      console.log("hey your server is running succesfullyy on port 7777...");
    });
  })
  .catch((err) => {
    console.error("heyy there is an error:\n", err);
  });

