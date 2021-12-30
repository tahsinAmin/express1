const express = require("express");

const rateLimit = require("express-rate-limit");
const app = express();

const limiter = rateLimit({
  max: 1,
  windowMs: 10000,
});

// const router = require("express").Router();
const axios = require("axios");

// Middleware
app.use(express.static("public"));

// import Router
// const weatherRoute = require("./routes/weather");

// use View Engine
app.set("view engine", "ejs");

// Middleware route
// app.use("/", weatherRoute);

app.get("/all/:country/:city", limiter, ({ params }, res) => {
  const { country, city } = params;
  console.log(country, city);
  const url_api = `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${city}&aqi=no`;
  axios.get(url_api).then((response) => {
    var jsonObject = JSON.stringify(response.data);
    var object = JSON.parse(jsonObject);
    const { location, current } = object;
    res.render("index", {
      city: location.name,
      country: location.country,
      temp_c: current.temp_c,
      temp_f: current.temp_f,
    });
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// https://www.youtube.com/watch?v=PozEoga90r8
