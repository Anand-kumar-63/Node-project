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
  next() and errors
  r1,r2,[r3,r4],r5
  concept of middleware and actual request handler and why do we need middleware..
  how express.js  handles request backend
  difference between app.use and app.all
  write a dummy auth middleware for admin 
  write a dummy auth middleware for all user routes
  error handeling using middleware err argumnet using app.use("/",(err,req,res,next)=>{}) and you should always place it towards the end..
}
# errors 
- when server is not returning the response
app.use(()=>{

})
- client will request the server and server dont have any response>> so request will just hanging around for some time
 there will be a timeout after sometime and req gets timedout >> there is nothing in the code to handle that req
- we have to send the response back 

# multiple route handlers
- [.use] is a request handler it can handle any kind of rq be it >>get ,post ,patch ,put ,delete
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

- if you already got the response from the route handler still you call next>> client will get the response and socket connection btw server ..... client get closed now when second route handler tries to send the response it will show an error

- you can wrap all your route handlers inside an array or some of them .. it wont affect your response 
ap.use("/ab",[r1,r2],r3,r4)

- you can also make sepearate route handler using same route..

# middleWares
these route handlersr are called [middleqares]
ap.use("/user"
<!-- middlewares -->
,(req,res)=>{
hye
}
,
(req,res)=>{
hey
}
,(req,res)=>{

}
,(req,res)=>{

},
)
- supose you are sending a request to the express server it takes and matches all the routes>> goes line by line to every  midedleware untill it reaches a fucntion that actually sends the response back>> and that function is called request handler >>all the in between functions are called middlewares
 
- 
app.use("/help",(req,res,next)=>{
    <!-- res.send("hey there i am your help"); -->
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
- here request handler is the help3 others are middlewares

# userAuth middleware and userAuth middle ware

# errorhandling
you can make a error handler

server.use("/help",(err,req,res,next)=>{
  if(err){
    res.status(404).send("hey there is some error");
  }
})


<!-------------------------------------------------LEC 19 --------------------------------------->
# mongodb cluster to compass connect
passowrd to my cluster -- KP6dZEUzj3OePsL2

- we are using mongoose to connect to our database >> mongoose is a very important liberary to create schemas and models 
- install mongooose 
- reqiure mongoose 
- mongoose.connect("mongodb+srv://anand2327cse1077:KP6dZEUzj3OePsL2@devtindercluster.2y6ga.mongodb.net/")
- put it in a ayncs function to get the pormise to use .then and .catch

# mongoose
- Mongoose is the most popular ODM mapping library for the MongoDB database. it provides schema-based options to model the application database.

# database should connect first then your app should start listen to api call
- you should connect to your db before your server start to listen to requests>>>first connect to the db then start listening to the api calls 
 >> for this you have to import the async function that is connecting the database to and call it inside app.js file after connecting to the database thenn call app.listen to start listening to the port 

# scheema creation using mongoose
- Models are defined using the Schema interface. The Schema allows you to define the fields stored in each document x along with their validation requirements and default values.

- scheema basically tells about -- what all info about the user we are storing into the database
- user can have firstname , lastname , age ,gender , profession etc
- mongodb recommend to use camelcase in scheema

const userSchema = new  mongoose.Schema({
 Firstname:{
  type:String
 },
 LastName:{
  type:String
 },
 Age:{
  type:Number
 },
 Gender:{
  type:String
 },
 Profession:{
  type:String
 },
 Location:{
  type:String
 }
})
# model("name of the collection your model is for",schema)
- const userModle = mongoose.model('user', userSchema);
- To create a model with Mongoose schemas, first define a schema that outlines the structure of your data, specifying field types and validation rules. Then, use mongoose.model() to create a model from the schema, enabling interaction with the MongoDB collection.

# create a "/signup" api to add some data to database and push some documnents to db


<!------------------------------------------LEC 20------------------------------------->
{difference between json and js object
add express.json middleware
make your signup api dynamic post data from the client}
# passing dynamic data to the API
- go to post then in request section go in body >> raw data>> json
- we are sending the dynamic data to our server in json format >> our server cannot read it so you need a middle ware to read that data and convert it into js object and send it to the databse..
- for this we have middelware provided by express >>[expressjson middleware]
- what json middlewaare done > it reads the json data and converts into js objects and adds that js object back to the request object in the body now the reqeust.body is a js object 
app.use(express.json());

- we can create a new instance of a userModle by using this object 
- now this signup API  is dynamic



>>app.use handles every request that comes to our server
  app.use(()=>{})
  handles request for every route