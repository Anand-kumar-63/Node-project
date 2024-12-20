const express = require("express"); 
const app = express();
require("./config/database.js");
const userModle = require("./models/user.js")
const datacall  = require("./config/database.js");

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

app.post("/signup",async (req,res)=>{
  // this req.body is a js object which is created by the middleware expres.json()
  console.log(req.body);
  // creating new instance of the usermodel
  const user = new userModle(req.body);
  // const user = new userModle( {
    // FirstName:"Nemesis",
    // LastName:"NaN",
    // Age:"69",
    // Gender:"male",
    // Profession:"software developer",
    // Location:"gonda"
  //   } );
  try{ 
    await user.save();
    res.send("data is added successfully");
    console.log(user);
  }
  catch(err){
    res.status(404).send("there is some error data is not added");
  }
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



