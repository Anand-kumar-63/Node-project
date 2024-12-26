const express = require("express");
const app = express();
require("./config/database.js");
const userModel = require("./models/userschema.js");
const datacall = require("./config/database.js");
const { validatetheuserdata } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser");
const {auth} = require("./Auth/userauth.js")
// middleware will work for all the routes
app.use(express.json());
app.use(cookieparser());

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
  try {
    const user = new userModel(req.body);
    await user.save();
    res.send("data is added successfully");
    console.log(user);
  } catch (err) {
    res.status(404).send("there is some error data is not added");
  }
});

app.post("/Signup", async (req, res) => {
  // req.body contains js objects
  try {
    validatetheuserdata(req);
    const { FirstName, LastName, Password, Email, Age } = req.body;
    const PasswordHash = await bcrypt.hash(Password, 10);
    console.log(PasswordHash);
    // creatin new instcance of the modle
    const user = new userModel({
      FirstName,
      LastName,
      Password: PasswordHash,
      Email,
      Age,
    });

    console.log(user);
    await user.save();
    console.log("save");
    res.send("data is added successfully");
  } catch (err) {
    console.log("Error", err);
    res.status(404).send("there is some error data is not added");
  }
});
// login authentication
app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    //use findone instead of find >> it returns an object instead of array of objects
    const user = await userModel.findOne({ Email: Email});
    console.log(user.Password);
    if (!user) {
      throw new Error("user is not in the db");
    } 
    else {
      const isvaliduser = await bcrypt.compare( Password , user.Password);
      if (isvaliduser) {
  // this jwt token store the id of the user logged in and private key 
     const jwtToken = jwt.sign({_id:user._id},"hulk@131974")
        res.cookie("JWToken", jwtToken);
        res.send("login succesfull");   
       }
     }
  } 
  catch (err) {
    res.send(err.message);
  }
});
// get porfile
app.get("/profile", auth , async (req, res) => {
  try {
    // // req.cookies is an object containing the object containing the jwt token
    // const cookies = req.cookies;
    // // extracting the jwt token from the object 
    // const token = cookies?.JWToken; 
    // if (!token) {
    //   return res.status(401).send("Token not found");
    // }
    // const decodingUser = jwt.verify(token, process.env.JWT_SECRET || "hulk@131974");
    // console.log(decodingUser);
    // const { _id } = decodingUser;
    // // finding the object usind the id::
    // const user = await userModel.findById(_id)
    const user = req.user;
    res.send(`Logged-in user ID is:${user}`);
  } 
  catch (error) {
  console.error("Error verifying token:", error.message);
  res.status(401).send(error.message)                           ;
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
    const finddocument = await userModel.find({ FirstName: loc });
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
    const pro = await userModel.find({ Profession: kaam });
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
    const delet = await userModel.deleteMany({ FirstName: del });
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
app.patch("/update", async (req, res) => {
  const upda = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "Email",
      "PhotoURL",
      "FirstName",
      "LastName",
      "Gender",
      "profession",
      "Age",
      "Location",
      "Skills",
    ];
    const isallowedupdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isallowedupdate) {
      throw new Error("invalid updates");
    }
    if (data.Skills.length > 10) {
      throw new Error("skills should be less than 10");
    }
    console.log(data);
    const update = await userModle.findByIdAndUpdate({ _id: upda }, data);
    res.status(200).send(update);
  } catch (err) {
    res.status(404).send("there is some error in updating the data");
  }
});

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
