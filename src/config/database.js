const mongoose = require("mongoose");
const datacall = async()=>{
 await mongoose.connect("mongodb+srv://anand2327cse1077:KP6dZEUzj3OePsL2@devtindercluster.2y6ga.mongodb.net/Devtinder")
}

module.exports = datacall;
