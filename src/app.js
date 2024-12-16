const express = require("express"); 
const app = express();

// app.use((req,res)=>{
//   res.send("hey there i got you ");
// });
// route handlers
app.use("/about",(req,res)=>{
  res.send("hey there i got you mr. /about");
});
app.use("/ab",function(req,res){
  res.send("heyy you are a gay");
});

app.listen( 7777 , ()=>{
  console.log("hey your server is running succesfullyy on port 7777...")
});
