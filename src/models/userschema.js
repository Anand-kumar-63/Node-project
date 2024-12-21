const mongoose = require('mongoose');
// creating schema
const userSchema = new  mongoose.Schema({
 FirstName:{
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
// creating model
const userModle = mongoose.model('Users', userSchema);

module.exports = userModle;