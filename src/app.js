const express = require("express"); 
const app = express();

// app.use((req,res)=>{
//   res.send("hey there i got you ");
// });
// route handlers
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
})

app.use("/ab",function(req,res){
  res.send("heyy you are a gay");
});

//  a req handler can have multiple route handler
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


app.listen( 7777 , ()=>{
  console.log("hey your server is running succesfullyy on port 7777...")
});
