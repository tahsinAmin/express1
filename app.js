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
            let temp_c_1 = (
              (hour[0].temp_c +
                hour[1].temp_c +
                hour[2].temp_c +
                hour[3].temp_c +
                hour[4].temp_c +
                hour[5].temp_c) /
              6
            ).toFixed(1);

            let temp_c_2 = (
              (hour[6].temp_c +
                hour[7].temp_c +
                hour[8].temp_c +
                hour[9].temp_c +
                hour[10].temp_c +
                hour[11].temp_c) /
              6
            ).toFixed(1);

            let temp_c_3 = (
              (hour[12].temp_c +
                hour[13].temp_c +
                hour[14].temp_c +
                hour[15].temp_c +
                hour[16].temp_c +
                hour[17].temp_c) /
              6
            ).toFixed(1);

            let temp_c_4 = (
              (hour[18].temp_c +
                hour[19].temp_c +
                hour[20].temp_c +
                hour[21].temp_c +
                hour[22].temp_c +
                hour[23].temp_c) /
              6
            ).toFixed(1);

            let temp_f_1 = ((9 / 5) * temp_c_1 + 32).toFixed(1);
            let temp_f_2 = ((9 / 5) * temp_c_2 + 32).toFixed(1);
            let temp_f_3 = ((9 / 5) * temp_c_3 + 32).toFixed(1);
            let temp_f_4 = ((9 / 5) * temp_c_4 + 32).toFixed(1);

            res.render("index", {
              city: name,
              country: country,
              temp_c_1: temp_c_1,
              temp_f_1: temp_f_1,
              temp_c_2: temp_c_2,
              temp_f_2: temp_f_2,
              temp_c_3: temp_c_3,
              temp_f_3: temp_f_3,
              temp_c_4: temp_c_4,
              temp_f_4: temp_f_4,
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
    // console.log(gottem);

    let temp_c_1 = (
      (gottem["forecast"]["forecastday"][0]["hour"][0].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][1].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][2].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][3].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][4].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][5].temp_c) /
      6
    ).toFixed(1);

    let temp_c_2 = (
      (gottem["forecast"]["forecastday"][0]["hour"][6].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][7].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][8].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][9].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][10].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][11].temp_c) /
      6
    ).toFixed(1);

    let temp_c_3 = (
      (gottem["forecast"]["forecastday"][0]["hour"][12].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][13].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][14].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][15].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][16].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][17].temp_c) /
      6
    ).toFixed(1);

    let temp_c_4 = (
      (gottem["forecast"]["forecastday"][0]["hour"][18].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][19].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][20].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][21].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][22].temp_c +
        gottem["forecast"]["forecastday"][0]["hour"][23].temp_c) /
      6
    ).toFixed(1);

    // let hour = gottem["forecast"]["forecastday"][0];
    // let temp_c_1 = (
    //   (hour[0].temp_c +
    //     hour[1].temp_c +
    //     hour[2].temp_c +
    //     hour[3].temp_c +
    //     hour[4].temp_c +
    //     hour[5].temp_c) /
    //   6
    // ).toFixed(1);

    let temp_f_1 = ((9 / 5) * temp_c_1 + 32).toFixed(1);
    let temp_f_2 = ((9 / 5) * temp_c_2 + 32).toFixed(1);
    let temp_f_3 = ((9 / 5) * temp_c_3 + 32).toFixed(1);
    let temp_f_4 = ((9 / 5) * temp_c_4 + 32).toFixed(1);

    res.render("index", {
      city: gottem.location.name,
      country: gottem.location.country,
      temp_c_1: temp_c_1,
      temp_f_1: temp_f_1,
      temp_c_2: temp_c_2,
      temp_f_2: temp_f_2,
      temp_c_3: temp_c_3,
      temp_f_3: temp_f_3,
      temp_c_4: temp_c_4,
      temp_f_4: temp_f_4,
    });
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// https://www.youtube.com/watch?v=PozEoga90r8
