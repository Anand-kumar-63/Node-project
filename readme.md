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
 
 >>it is used to give the port number on which you want to run your server on
  ap.listen( portnumber , function()=>{
    cosole.log("something")
  })
   
# nodemon module
npm i -g nodemon
>> what does nodemon do??
it is used so that when we do some changes in our file server automatically get refershed whenver any changes made to the code 
>>we dont need to refresh the server again and again 

