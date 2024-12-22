const mongoose = require("mongoose");
// creating schema
const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 10,
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
    },
  },
  {
    timestamps: true,
  }
);
// creating model
const userModle = mongoose.model("Users", userSchema);

module.exports = userModle;
