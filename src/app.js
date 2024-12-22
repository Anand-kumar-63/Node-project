const express = require("express");
const app = express();
require("./config/database.js");
const userModle = require("./models/userschema.js");
const datacall = require("./config/database.js");

// middleware will work for all the routes
app.use(express.json());

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

app.post("/postdata", async (req, res) => {
  // req.body contains js objects
  const user = new userModle(req.body);
  try {
    if (!req.body.FirstName) {
      throw new Error("Firstname is required");
    } else {
      console.log(user);
      await user.save();
      console.log("saved");
      res.send("data is added successfully");
    }
  } catch (err) {
    console.log("Error", err);
    res.status(404).send("there is some error data is not added");
  }
});
app.get("/signup", async (req, res, next) => {
  // this req.body is a js object which is created by the middleware expres.json()
  // console.log(req.body);
  // creating new instance of the usermodel
  // const user = new userModle(req.body);

  // extracting the location from the request to filter the data
  const loc = req.body.FirstName;
  try {
    console.log("the fristname is :", loc);
    const finddocument = await userModle.find({ FirstName: loc });
    res.send(finddocument);
    // next();
  } catch (err) {
    res
      .status(404)
      .send("There is no documnet in tha database matching the filter");
  }
  // to add data to the collection passed in model
  // const user = new userModle( {
  // FirstName:"Nemesis",
  // LastName:"NaN",
  // Age:"69",
  // Gender:"male",
  // Profession:"software developer",
  // Location:"gonda"
  //   } );

  // try{
  //   await user.save();
  //   res.send("data is added successfully");
  //   console.log(user);
  // }
  // catch(err){
  //   res.status(404).send("there is some error data is not added");
  // }
});
// handle request at route /Profession
app.get("/Profession", async (req, res) => {
  const kaam = req.body.Profession;
  try {
    console.log(kaam);
    const pro = await userModle.find({ Profession: kaam });
    if (pro.length > 0) {
      res.send(pro);
    } else {
      res.send(404).send("No documnet matches the filter in the collection");
    }
  } catch (err) {
    res.status(404).send("there is no document in the collection user");
  }
});
// to delete the data from the collection
app.delete("/delete", async (req, res) => {
  // reading the data from req
  const del = req.body.FirstName;
  try {
    console.log(del);
    const delet = await userModle.deleteMany({ FirstName: del });
    if (delet.deletedCount > 0) {
      res.send(delet);
    } else {
      res.status(404).send("No documents matched the filter in the collection");
    }
  } catch (err) {
    res.status(404).send("No document matched to the filter in the collection");
  }
});
// api to update of the user
app.patch("/update/:userId", async (req, res) => {
  const upda = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "FirstName", "LastName","Gender","profession","Age","Location","Skills"];
    const isallowedupdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isallowedupdate) {
     throw new Error("invalid updates");
    }
    if(data.Skills.length>10){
      throw new Error("skills should be less than 10");
    }
    console.log(data);
    const update = await userModle.findByIdAndUpdate({ _id: upda }, data);
    res.status(200).send(update);
  } catch (err) {
     res.status(404).send("there is some error in updating the data");
  }});

// databse setup
datacall()
  .then(() => {
    console.log("database connected succesfulyy");
    app.listen(7777, () => {
      console.log("hey your server is running succesfullyy on port 7777...");
    });
  })
  .catch((err) => {
    console.error("heyy there is an error");
  });
