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
# response methods
there are various type of res.nethods like send , json , jsonp and many more 
read more -- http://expressjs.com/en/4x/api.html#res
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
>>[schema]
- Models are defined using the Schema interface. The Schema allows you to define the fields stored in each document x along with their validation requirements and default values.
- scheema basically tells about -- what all fields about the user we are storing into the database
- user can have firstname , lastname , age ,gender , profession etc
- mongodb recommend to use camelcase in scheema
>>[Models]
- a mongoose Model is just a wrapper on the mongoose schema >> mongoose model porvides an interface[collection] to the database  for creating , quering , updating , deleting documents...
- with the help of model we create a collection >> in which we store the document structured using schema 

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

# extra
# chianable route handlers for a route path
- app.route()
- you can handle multiple requests at a particular route and send multiple response for a particular request 
- You can create chainable route handlers for a route path by using app.route(). Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos.
- Here is an example of chained route handlers that are defined by using app.route().
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')

<!------------------------------------------LEC 20------------------------------------->
{difference between json and js object
add express.json middleware
make your signup api dynamic post data from the client
create a delete user api
get user api
post user api
difference between patch and put
create a update user Api using emial id instead of userid
read mongoose documentation for model methods
what is option argument in model.findByIdAndUpadate

}
# passing dynamic data to the API
- go to post then in request section go in body >> raw data>> json
- we are sending the dynamic data to our server in json format >> our server cannot read it so you need a middle ware to read that data and convert it into js object and send it to the databse..
- for this we have middelware provided by express >>[expressjson middleware]
- what json middlewaare done > it reads the json data and converts into js objects and adds that js object back to the request object in the body now the reqeust.body is a js object 
app.use(express.json());

- we can create a new instance of a userModle by using this object 
- now this signup API  is dynamic
>> # insertMany documents
insertMany:
    This method is optimized for inserting multiple documents at once.
    It automatically handles the array structure in req.body.

# any other data which is apart from your schema will get ignored by all the API

#
>>app.use handles every request that comes to our server
  app.use(()=>{})
  handles request for every route

# .find to find a document in the collection
- .find({filter}) gives you [array] of all the documnets matching the filter in the collection..
- in which collection it is going to find is decided by the userModle you created with the help of schema>>which creating the modle you passes a collection 

app.get("/Profession" , async (req,res)=>{
  const kaam = req.body.Profession;
  try{
    console.log(kaam);
    const pro = await userModle.find({Profession:kaam});
    if(pro.length>0){
      res.send(pro);}
      else
      {
        res.send(404).send("No documnet matches the filter in the collection")
      }
  }
  catch(err){
    res.status(404).send("there is no document in the collection user");
  }
});
- 
# .deleteMany
- Deletes all of the documents that match conditions from the collection. It returns an [object] with the property deletedCount containing the number of documents deleted. Behaves like remove(), but deletes all documents that match conditions regardless of the single option.
- from which collection its going to delete the documnet it depends upon the model we are using >> that model takes a collection name and schema 
app.delete("/delete",async(req,res)=>{
  // reading the data from req
  const del = req.body.FirstName;
  try{
    console.log(del);
    const delet = await userModle.deleteMany({FirstName:del});
    if (delet.deletedCount > 0) {
      res.send(delet);
    } else {
      res.status(404).send("No documents matched the filter in the collection");
    }}
  catch(err){
  res.status(404).send("No document matched to the filter in the collection");   
  }
}) 
# update user api 
- updats the document using UserId 
app.patch("/update",async(req,res)=>{
 const upda = req.body.userId;
 const data = req.body;
try{
  const update = await userModle.findByIdAndUpdate({_id:upda},data)
  res.send(update);
}catch(err){
  res.status(404).send("No document matchd the filter")
}
})

<!----------------------------------------------- Lec21 --------------------------------------------->
# data sanitisation and schema validation
{explore the schema type options and dpocumentation 
add require , unique , lowercase , uppercase , min , max
add default
create a custom validate function for gender
put all appropriate validations on the fields of schema
add timestams to userschema>>creation and updation
add API level validations to patch request and sigun  post api
add api validation for each fields 
explore the validator library and install it use it fro password Email and URL
}
# schema type
- A SchemaType defines the type of data a field can store. 
- What is a SchemaType? 
  A SchemaType is the configuration for an individual property within a Mongoose schema.
- The type Key
  Each property in a schema can be defined using a specific SchemaType.
  Built-in SchemaTypes:
        String
        Number
        Date
        Buffer
        Boolean
        Mixed
        ObjectId
        Array
        Decimal128
        Map
        Schema
        UUID
        BigInt
        Double
        Int32
Custom plugins can also introduce additional SchemaTypes
>>[options]
The SchemaType defines what kind of data the field stores, and the options define rules or behaviors or some constraints for that data.

# properties for fields


# timestamp 
- when your schema creation is done you have to pass a second object 

# API level validations for patch and post APIs
- if the user is updating the profile it can only update certain fields 
- what are the fields a user can change 
 >> Firstname , lastname , gender , about
 how will you do that ??
 >> going to vaildate the data we are getting from request body
  
- const ALLOWED_UPDATES = ["FirstName","LastName","Gender","profession","age","Location"]
  // we are checking whether the user is trying to update the valid fileds or not 
  // if not then we will send the error message
  // we are interating over the keys of the object and checking whether the keys are valid or not 
  const isallowedudate = object.key(data).every((k)=>ALLOWED_UPDATES.includes(k));

   try {
    const ALLOWED_UPDATES = [
      "userId",
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
      res.status(404).send("invalid update");
    }
    console.log(data);
    const update = await userModle.findByIdAndUpdate({ _id: upda }, data);
    res.status(200).send(update);
  } catch (err) {
    res.status(404).send("No document matchd the filter");
  }});
- you can add API level validation for each fields>> this known as data sanitisation
-{we can add API level validation and db[schema] level validation }

# NPM validator Lib

- if you not put validations for email its gonna be created a user with that incorrect emailid 
- there is [validator] library for checking the validation of multiple fields you dont have to write the validation manually for every fields
- npm i validator
 {>>syntax for validation at schema level
  validate(value){
        if(!validator.isEmail(value)){
          throw new Error ("Email in invalid");
        }} 
 }
- [validator.isEmail(value)] checks if the string is an Email        
- you can validate even the photo URL to be a real URL
>> checks is the string URL or not::
  validate(value){
    if(!validator>isURL(value){
      throw new Error("invalid photo URL")
    })
  }
- [validator>isURL(value)] check if the string is a URL  

<!--------------------------------LEC22 ------------------------->
# user authentification
how password encryption is done
- first validate the password 
- then hash the password{using bcrypt library} - npm i bcrypt>>
- then save the password into the database

- during login there is a function in bcrypt lib to compare the stored hashed password with the entered password
  bcrypt.compare("text password","hashed one");>>returns boolean

<!---------------------------------------------- LEC23 ----------------------------------------------->
 {
 install cookie-parser
 just send a dummy cookie to user
 creaet a Get/profile to check if you get the cookie back
 install jsonwebtoken
 in login api after e mail and password verification genearte jwt token 
 read the cookies inside your profile api and find the logged in user
 use auth middle ware
 jwt token and cookie expiery
 } 
# advanced user authentification
- if you are loged in you can see your profile, delete it , update it, you can send request and you can review requests
- every time when api request send to server it always have to validate that the user is valid or not 
>>user is asking for updating the profile then update it and send back to the if the user is valid
>>in [TCP/IP] protocol you make the request get the data and socket connection get closed.>>>every time you make an api call user needs to be validated wheather the request is comming form a valid soruce or not>>>user should be logged in
>>{login??} when user login using emial and password then server validate the creadentials and send back a token inside cookies
         this token was send back to the user in response and that jwt token is stored in the clients browser 
         >> now every time when user is making an api req this token goes with the request and gets validated by the server 


# JWT tokens[stateless Authentication]- there is no need to manage the state in the server
- This token is often used to securely transfer information between two parties and verify a user's identity during authentication and authorization.
- server locks the user info inside the token and locks it with a secret key that is only generated by the server so no oneone can change any thing in that token
>>jwt token contains the [userdata] plus a [secretkey] generated by the server
>>token can only be changed when you have the secret key
>> when you are loging in you server is giving a secret key along with payload to genrate the token>> now when you again make an api request jwt.verify method verifies the token using that secret key>>so if you changed  something in your token server will show an error
>> now lets say server restarts you still have you token[info] you dont need to login again you can again sent api request and get back the response 
thats why its stateless because you server dont have to manage the state of the user... 

[{structure of JWT}]
- JSON Web Tokens consist of three parts separated by dots (.), which are:
    Header.Payload.Signature == xxxxx.yyyyy.zzzz
- [Header]--The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as 
HMAC-SHA256 , SHA-256 or RSA.
{
  "alg": "HS256",
  "typ": "JWT"
}
- [Payload]--The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data.
-Contains a set of claims. The JWT specification defines seven Registered Claim Names, which are the standard fields commonly included in tokens.[1] Custom claims are usually also included, depending on the purpose of the token
https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields
{
  "loggedInAs": "admin",
  "iat": 1422779638
}
- [Signature]--Securely validates the token. The signature is calculated by encoding the header and payload[base64 url enconding] using Algorithms such as sha-256 
-To create the signature part you have to take the encoded header, the encoded payload, a secretkey , the algorithm specified in the header, and sign that.
-For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)


{[to creaet jwt there is a lib in npm]}
- lib for creating json web tokens  >>> npm i jsonwentoken 
--jwt.sign is a method from the jsonwebtoken library used to generate a JSON Web Token (JWT). 
jwt.sign(payload, secretOrPrivateKey, [options, callback])
--this jwt token store the id of the user logged in and private key 
  const jwtToken = jwt.sign({_id:user._id},"hulk@131974")

- jwt.verify(token,secret)
--JWT verify method is used for verify the token the take two arguments one is token string value, and second one is secret key for matching the token is valid or not. The validation method returns a decode object that we stored the token in.

# cookies
- how these token are stored at users place??>>[cookies]
- when user login using emial and password then server validate the creadentials and send back a token inside cookies
- browser stores the cookies>>job of the browser is to read those cookies and keep it safely..
- on every api request cookies will go with it and gets validated every time >> then server sends back the response 
- you can set the expiry time of cookie
>>lets say the cookie expires in between and you are still making an api call >> currrent cookie will fail the validation and res will come that login again and you will get redirected to the login page

- there is a npm lib to generate cookie also
- npm i cookie

-{cookie-parser middleware}
>>const cookieparser = require("cookie-parser");
>>When using cookie-parser middleware, req.cookie is an object that contains cookies sent by the request. If the request contains no cookies, it defaults to {}.
>>cookie-parser Parse the Cookie header and populate req.cookies with an object keyed by the cookie names. 
>>The cookie.parse function is part of the cookie package in Node.js and is used to parse the Cookie header in an HTTP request. This header contains  a string of key-value pairs representing cookies sent by the client
code>>

- read more about cookies 
https://www.geeksforgeeks.org/express-cookie-parser-signed-and-unsigned-cookies/
  
{some properties of the cookie}
- cookies are domain specific >> they are bydefault secure >> your browser can have cookies from multiple domains but when you send request to a particular domain the cookie generated by that server goes with the request
- we can set the cookies domain
- we can  set the expiery time of the cookie
res.cookie("name",token,options)

The options parameter is an object that can have the following properties.
Property 
domain>> 	String >>	Domain name for the cookie. Defaults to the domain name of the app.
encode>> 	Function >>	A synchronous function used for cookie value encoding. Defaults to encodeURIComponent.
expires>> Date >>	Expiry date of the cookie in GMT. If not specified or set to 0, creates a session cookie.
httpOnly>> 	Boolean>> Flags the cookie to be accessible only by the web server.
maxAge>> 	Number>> 	Convenient option for setting the expiry time relative to the current time in milliseconds.
path>> 	String>> 	Path for the cookie. Defaults to “/”.
secure>> 	Boolean>> 	Marks the cookie to be used with HTTPS only.
signed>> 	Boolean>> 	Indicates if the cookie should be signed.


# create auth middleware and validate the token for every API request
- you can expire your jwt token and cookies such that after sometime user should login again
# Handler methods of schema
>>you can make a helper function for jwt or password verification
--To get jwt token 
userSchema.methods.getJWT = function(){
  const user = this;
  const jwtToken = jwt.sign({_id:user._id},"hulk@131974",{ expiresIn:"1d"})
  return jwtToken;
}
- for password verification
userSchema.methods.verifyPassword = async function(ReqPassword){
  const user = this;
  const isvalid =await bcrypt.compare(ReqPassword , user.Password);
  return isvalid;
}
- for finding the user from userModel
userSchema.methods.finduser = async function(em){
const user = await userModel.findOne({Email:em});
console.log(user);
return user;
}

<!--------------------------------- LEC 24 diving into the API and Express router ---------------------------------------->
{
explore tinder apis
group mutilple routes under respective routes
Read documentation for express.router
craete route folder for managin auth , profile , update , request routers
import in app.js
}




# API requests
- Authentication Router
-post/signup
-post/login
-post/Logout

- Profile Router
-Get/profile
-patch/profile/update
-patch/profile/password/update
-patch/profile/Email/update

- Connection request Router
-post/request/interest
-post/request/ignore
-post/resquest/accept
-post/request/reject

- user router 
-get/user/connection
-get/user/requests
-get/user/feed

# Express Routers
const Authrouter = express.Router();
- To manage routing of so many apis
- read more about express routing 
http://expressjs.com/en/guide/routing.html#express-router
# create API logout
- login is token gets expire 