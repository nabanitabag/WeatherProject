const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {

  // https.get("http://api.openweathermap.org/data/2.5/weather?q=london);
  res.send("running");
})

app.listen(3000, function() {
  console.log("server running");
});
