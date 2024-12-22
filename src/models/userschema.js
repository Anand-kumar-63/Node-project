const mongoose = require("mongoose");
const validator = require("validator");
// creating schema
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 10,
    },
    PhotoURL: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid photo URL",+ value);
        }
      }
    },
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
      // validate the email using validate library
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
// creating model
const userModle = mongoose.model("Users", userSchema);

module.exports = userModle;
