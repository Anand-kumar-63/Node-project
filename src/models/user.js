const mongoose = require('mongoose');

const userSchema = mongoose.schema({
  FirstName:{
    type:String
  },
  LastName:{
    type:string
  },
  age:{
    type:Number 
  },
  gender:{
    type:string
  },
  profession:{
    type:string
  },
  email:{
    type:string
  }
})

const usermodel = mongoose.model('user',userschema);

module.exports = usermodel;