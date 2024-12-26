const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// creating schema
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 50,
    },
    // PhotoURL: {
    //   type: String,
    //   validate(value) {
    //     if (!validator.isURL(value)) {
    //       throw new Error("invalid photo URL",+ value);
    //     }
    //   }
    // },
    LastName: {
      lowercase: true,
      type: String,
    },
    Skills: {
      type: Array,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
      type: String,
    },
    Profession: {
      type: String,
      default: "developer",
    },
    Password:{
      type:String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong Password"+value);
        }
      }
    },
    Location: {
      type: String,
    },
    date: {
      deafult: Date.now,
      type: Date,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email in invalid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// to get jwt token
userSchema.methods.getJWT = function(){
  const user = this;
  const jwtToken = jwt.sign({_id:user._id},"hulk@131974",{ expiresIn:"1d"})
  return jwtToken;
}
// for verification of the Password
userSchema.methods.verifyPassword = async function(ReqPassword){
  const user = this;
  const isvalid =await bcrypt.compare(ReqPassword , user.Password);
  return isvalid;
}
// for finding the user 
userSchema.methods.finduser = async function(em){
const user = await userModel.findOne({Email:em});
console.log(user);
return user;
}
// creating model
const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
