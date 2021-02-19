const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res) {
  res.sendfile(__dirname +"/index.html");
});

app.post("/", function (req,res) {
const query = req.body.City;
const appKey = "ae293030bc56a7c970bf90945ae88231";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"+&appid="+appKey+"&units="+unit;

https.get(url, function(response) {
  console.log(response.statusCode);

  response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const descr = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgURL = "https://openweathermap.org/img/wn/"+icon+ "@2x.png";

    res.write("<p>The weather is currently "+descr+".</p>");
    res.write("<h1> The temperature in "+query+" is "+temp+" degree Celsius. </h> ");
    res.write("<img src = "+imgURL+">");
    res.send();

  });
});

});
app.listen(3000, function() {
  console.log("server running on 3000");
});
