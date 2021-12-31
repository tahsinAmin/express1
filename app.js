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
  const curerentDate = "2021-12-29";
  // console.log(country, city);
  var data = fs.readFileSync("data.json");
  // const url_api = `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${city}&aqi=no`;
  const url_api = `https://api.weatherapi.com/v1/history.json?key=e6a73467a3e94aa184c122435212812&q=${country}&q=${city}&dt=${curerentDate}&aqi=yes`;

  var jsonRead = JSON.parse(data);
  let flag = true;
  let gottem;

  for (let i = 0; i < jsonRead.length; i++) {
    const q = jsonRead[i]["location"]["name"].toLocaleLowerCase();
    if (q == city) {
      // var object = jsonRead[i];
      console.log("Fetch from json file");
      flag = !flag;
      gottem = jsonRead[i];
      break;
    }
  }

  if (flag) {
    console.log("Trying to fetch from API");
    axios
      .get(url_api)
      .then((response) => {
        var jsonObject = JSON.stringify(response.data);
        var object = JSON.parse(jsonObject);
        if (object == undefined) {
          res.render("bad", {
            message: "1. BAD REQUEST 404!!",
          });
        } else {
          jsonRead.push(object);
          var newData2 = JSON.stringify(jsonRead);
          fs.writeFileSync("data.json", newData2);

          const { name, country } = object.location;
          const { hour } = object.forecast.forecastday[0];
          if (country.toLocaleLowerCase() == country.toLocaleLowerCase()) {
            let temp_c_1_min = [];
            let temp_c_2_min = [];
            let temp_c_3_min = [];
            let temp_c_4_min = [];
            let temp_c_1_max = [];
            let temp_c_2_max = [];
            let temp_c_3_max = [];
            let temp_c_4_max = [];

            for (let i = 0; i < hour.length; i++) {
              if (i >= 0 && i <= 5) {
                temp_c_1_min.push(hour[i].temp_c);
                temp_c_1_max.push(hour[i].temp_c);
              } else if (i >= 6 && i <= 11) {
                temp_c_2_min.push(hour[i].temp_c);
                temp_c_2_max.push(hour[i].temp_c);
              } else if (i >= 12 && i <= 17) {
                temp_c_3_min.push(hour[i].temp_c);
                temp_c_3_max.push(hour[i].temp_c);
              } else {
                temp_c_4_min.push(hour[i].temp_c);
                temp_c_4_max.push(hour[i].temp_c);
              }
            }

            temp_c_1_min = Math.min(...temp_c_1_min);
            temp_c_2_min = Math.min(...temp_c_2_min);
            temp_c_3_min = Math.min(...temp_c_3_min);
            temp_c_4_min = Math.min(...temp_c_4_min);
            temp_c_1_max = Math.max(...temp_c_1_max);
            temp_c_2_max = Math.max(...temp_c_2_max);
            temp_c_3_max = Math.max(...temp_c_3_max);
            temp_c_4_max = Math.max(...temp_c_4_max);

            let temp_f_1_min = ((9 / 5) * temp_c_1_min + 32).toFixed(1);
            let temp_f_2_min = ((9 / 5) * temp_c_2_min + 32).toFixed(1);
            let temp_f_3_min = ((9 / 5) * temp_c_3_min + 32).toFixed(1);
            let temp_f_4_min = ((9 / 5) * temp_c_4_min + 32).toFixed(1);
            let temp_f_1_max = ((9 / 5) * temp_c_1_max + 32).toFixed(1);
            let temp_f_2_max = ((9 / 5) * temp_c_2_max + 32).toFixed(1);
            let temp_f_3_max = ((9 / 5) * temp_c_3_max + 32).toFixed(1);
            let temp_f_4_max = ((9 / 5) * temp_c_4_max + 32).toFixed(1);

            res.render("index", {
              city: name,
              country: country,
              temp_c_1_min,
              temp_c_2_min,
              temp_c_3_min,
              temp_c_4_min,
              temp_f_1_min,
              temp_f_2_min,
              temp_f_3_min,
              temp_f_4_min,
              temp_c_1_max,
              temp_c_2_max,
              temp_c_3_max,
              temp_c_4_max,
              temp_f_1_max,
              temp_f_2_max,
              temp_f_3_max,
              temp_f_4_max,
            });
          } else {
            res.render("bad", {
              message: "BAD REQUEST 404! City name doesn't match with country",
            });
          }
        }
      })
      .catch(function (error) {
        if (error.response) {
          res.render("bad", {
            message: error.response.data.error.message,
          });
        }
      });
  } else {
    let temp_c_1_min = [];
    let temp_c_2_min = [];
    let temp_c_3_min = [];
    let temp_c_4_min = [];
    let temp_c_1_max = [];
    let temp_c_2_max = [];
    let temp_c_3_max = [];
    let temp_c_4_max = [];

    for (
      let i = 0;
      i < gottem["forecast"]["forecastday"][0]["hour"].length;
      i++
    ) {
      if (i >= 0 && i <= 5) {
        temp_c_1_min.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
        temp_c_1_max.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
      } else if (i >= 6 && i <= 11) {
        temp_c_2_min.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
        temp_c_2_max.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
      } else if (i >= 12 && i <= 17) {
        temp_c_3_min.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
        temp_c_3_max.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
      } else {
        temp_c_4_min.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
        temp_c_4_max.push(
          gottem["forecast"]["forecastday"][0]["hour"][i].temp_c
        );
      }
    }

    temp_c_1_min = Math.min(...temp_c_1_min);
    temp_c_2_min = Math.min(...temp_c_2_min);
    temp_c_3_min = Math.min(...temp_c_3_min);
    temp_c_4_min = Math.min(...temp_c_4_min);
    temp_c_1_max = Math.max(...temp_c_1_max);
    temp_c_2_max = Math.max(...temp_c_2_max);
    temp_c_3_max = Math.max(...temp_c_3_max);
    temp_c_4_max = Math.max(...temp_c_4_max);

    let temp_f_1_min = ((9 / 5) * temp_c_1_min + 32).toFixed(1);
    let temp_f_2_min = ((9 / 5) * temp_c_2_min + 32).toFixed(1);
    let temp_f_3_min = ((9 / 5) * temp_c_3_min + 32).toFixed(1);
    let temp_f_4_min = ((9 / 5) * temp_c_4_min + 32).toFixed(1);
    let temp_f_1_max = ((9 / 5) * temp_c_1_max + 32).toFixed(1);
    let temp_f_2_max = ((9 / 5) * temp_c_2_max + 32).toFixed(1);
    let temp_f_3_max = ((9 / 5) * temp_c_3_max + 32).toFixed(1);
    let temp_f_4_max = ((9 / 5) * temp_c_4_max + 32).toFixed(1);

    res.render("index", {
      city: gottem.location.name,
      country: gottem.location.country,
      temp_c_1_min,
      temp_c_2_min,
      temp_c_3_min,
      temp_c_4_min,
      temp_f_1_min,
      temp_f_2_min,
      temp_f_3_min,
      temp_f_4_min,
      temp_c_1_max,
      temp_c_2_max,
      temp_c_3_max,
      temp_c_4_max,
      temp_f_1_max,
      temp_f_2_max,
      temp_f_3_max,
      temp_f_4_max,
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// https://www.youtube.com/watch?v=PozEoga90r8
