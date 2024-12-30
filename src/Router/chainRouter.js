const express = require("express");
const chainHandler = express.Router();

//  to handle multiple requests[get post patch] at the same route and get different response for each request
chainHandler
  .route("/multiple")
  .get((req, res) => {
    res.jsonp({ hye: "nio" });
    // res.send("hey there is me get1")
  })
  .post((req, res) => {
    res.send("hey there is me post1");
  })
  .patch((req, res) => {
    res.send("hey there i am patch1");
  });

module.exports = chainHandler;
