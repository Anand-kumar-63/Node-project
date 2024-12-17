const express = require("express"); 
const app = express();
// req handler
app.use("/about",(req,res)=>{
  res.send("hey there i got you mr. /about");
});
app.get("/u/",(req,res)=>{
  res.send("hey you got the data");
})
app.delete("/del",(req,res)=>{
  res.send("hey data deleted");
})
app.post("/post",(req,res)=>{
  res.send("data posted");
});

//  a req handler can have multiple route handler
app.use("/help",(req,res,next)=>{
    res.send("hey there i am your help");
    next();
});

app.use(("/help"),(req,res,next)=>{
  // res.send("help1");
  console.log("help mil gyi 1");
  next();
},
(req,res,next)=>{
  console.log("help mil gyi 2");
  // res.send("help2");
  next();
},
(req,res,next)=>{
  res.send("help3");
  console.log("help mil gyi 3");
},
)

// 
app.use("/hey",(req,res)=>{
  console.log("heyyyyy")
  // there is no response 
})


app.listen( 7777 , ()=>{
  console.log("hey your server is running succesfullyy on port 7777...")
});
