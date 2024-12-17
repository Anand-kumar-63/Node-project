<!-- lec16 -->
{create a repository 
 intialise repo 
 install express
 node_modules , package-lock.json , package.json
 create a server
 write request handlers for /test , /call
 install nodemon and update scripts in package.json
 what are dependencies
 use of -g while installing nodemon
 differenec between tilda^ and ~
 }


- first npm inti >>  it will create a package.json file its kind of a index of your project
- s2
>>we have to build a server to settle connect requests
- we will use express js to build our server
# Express js
- you have to install the express into your folder 
 npm i express

- node module is created 
>>when you instal express module it downloaded all the express code and put in node_modules inside your project folder
so that you can use it 

- package-lock.json
>>

- dependencies inside [package.json]
>>when you install any package inside your folder it just added into dependencies
>>our project is dependent on dependencies like express.js

- why there are other folders in node_module except express code ??
>>when we install a module its code is downloded and offloaded inisde the node_module folder..
>>express js also has some dependencies it also has a json file inside express folder..
>>these depedencies can also have their own dependencies all of these come from npm when we isntall a node module in our project..

- # differnce between package.json and package-lock.json
>>

- # scripts inside package.json
>>  "scripts": {
    "start": "node src/app.js",
    "test": "nodemon src/app.js"
  },
  when you will call npm run start it will run tihis command  "node src/app.js
  when you will call npm run test it will run this command "nodemon src/app.js"

- # reqiure express 
>> const ex = require("express");
const ap = ex();
>> .use , .listen methods 
[.use]
 >> it is used to handle request from the client 
 ap.use( path , function(req,res)=>{
  <!-- responed you want to give to the user -->
 })
 
 >># request handler 
  ap.use("/about" , ()=>{
  conseole.log("hey this is about section of your website")
   })

 jsut like this you can create different req handler 

[.listen]
 >>// when you call this .listen method you have to pass a port number on which you want your application to be running on and second parameter it takes is a callback function which runs when server is working :: 

 >>it is used to give the port number on which you want to run your server 
  ap.listen( "7777" , function()=>{
    cosole.log("something")
  })
  this server is listening on port number 7777
   
# nodemon module
npm i -g nodemon
>> what does nodemon do??
it is used so that when we do some changes in our file server automatically get refershed whenver any changes made to the code 
>>we dont need to refresh the server again and again 

# info about node_modules
>> you can easily reinstall your all node_module if you have package.json >> package.json has dependencies
npm i

<!-----------------------------------------------------lec 17--------------------------------------------------------->
>>initialising local repository 
git init 
git add .
<!-- git add . means all the files-->
git commit -am "build the sever"
git status
>>now pushing to remote repository 
git remote add origin https://github.com/Anand-kumar-63/Node-project.git
<!--push to origin main branch-->
git push -u origin main

# postman
>> intsall postman to test the api's
>> we can test our api calls on postman

# dynamic routing inside route handlers
>>explore routes using +,(),?,* in route handlers
app.post("/ab+ut",(req,res)=>{
res.send("hey there it is your dyn");
})

app.post("/ab?",(req,res)=>{
res.send("hey there it is your dyn");
})

app.post("/ab+ut",(req,res)=>{
res.send("hey there it is your dyn");
})

app.post("/ab*t",(req,res)=>{
res.send("hey there it is your dyn");
})

app.post("/ab/",(req,res)=>{
res.send("hey there it is your dyn");
})

<!-------------------------------------- lec 18--------------------------------------- -->
# Route handlers and middlewares

{
  Multiple route handlers
  
}
- [.use] is a request handler it can handle any find of rq be it >>get ,post ,patch ,put ,delete
- one argument is route and second one is a route handler >> route handler have three params (request , respose , next)>>next for other route handlers
- you can have multiple route handlers in a req handler >> you can have as many route handlers as you want..
- to access those multiplel route handlers there is a [next()] method given by express
- when you are not getting the response throug first handler you can call next();>> so the server will go to next 

ap.use(("/user")  
, (req,res,next)=>{
  <!-- res.send("dwebcbsdjkb"); -->
  next();
} 
, (req, res ,next)=>{
  res.send(")
}
, (req, res ,next)=>{
  res.send(")
}); 

- if you already got the response from the route handler still you call next>> client will get the response and server client connection get closed now when second route handler tries to send the response it will show an error
- 