const express = require("express");
const fs = require("fs");
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
  var data = fs.readFileSync("data.json");
  const url_api = `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${city}&aqi=no`;

  var jsonRead = JSON.parse(data);
  let flag = true;
  let gottem;

  for (let i = 0; i < jsonRead.length; i++) {
    const q = jsonRead[i]["location"]["name"].toLocaleLowerCase();
    console.log(q);
    if (q == city) {
      var object = jsonRead[i];
      console.log("Fetch from json file");
      flag = !flag;
      gottem = jsonRead[i];
      break;
    }
  }

  if (flag) {
    console.log("Fetch from API");
    axios
      .get(url_api)
      .then((response) => {
        var jsonObject = JSON.stringify(response.data);
        var object = JSON.parse(jsonObject);
        if (object["error"]) {
          res.render("bad", {
            message: "BAD REQUEST 404!!",
          });
        } else {
          jsonRead.push(object);
          var newData2 = JSON.stringify(jsonRead);
          fs.writeFileSync("data.json", newData2);
          const { location, current } = object;
          if (country == location.country.toLocaleLowerCase()) {
            res.render("index", {
              city: location.name,
              country: location.country,
              temp_c: current.temp_c,
              temp_f: current.temp_f,
            });
          } else {
            res.render("bad", {
              message: "BAD REQUEST 404!!",
            });
          }
        }
      })
      // .catch((error) => {
      //   console.log(error);
      //   res.render("bad", {
      //     message: "BAD REQUEST 404!!",
      //   });
      // });
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  } else {
    res.render("index", {
      city: gottem["location"]["name"],
      country: gottem["location"]["country"],
      temp_c: gottem["current"]["temp_c"],
      temp_f: gottem["current"]["temp_f"],
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// https://www.youtube.com/watch?v=PozEoga90r8
