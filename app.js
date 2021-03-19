const express = require("express");
const https = require("https");
const app = express();
const ejs = require("ejs");


app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const date = require(__dirname + "/date.js");

app.get("/", function (req, res){
    const day = date.getDate();
    res.render("index", {day: day});
 });

app.post("/", function(req,res){
    
    console.log(req.body.cityName);

    const day = date.getDate();
    const query = req.body.cityName;
    const apiKey = `e17e0fda76297b40f9df72e16fddc84d`;
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
  const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const country = weatherData.sys.country
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;
  const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
  res.render("result" ,{temp: temp, weatherDescription: weatherDescription, query: query, imageURL: imageURL, day: day, country: country});
     });
   });

});








app.listen(3000, function(){
    console.log("server is running");
});