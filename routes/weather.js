const router = require("express").Router();
const axios = require("axios");
// const path = require("path");
// require("dotenv").config();

// router.get("/", (req, res) => {
//   res.render("index");
// });

router.get("/all/:country/:city", ({ params }, res) => {
  const { country, city } = params;
  console.log(country, city);
  const url_api = `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${city}&aqi=no`;
  axios.get(url_api).then((response) => {
    var jsonObject = JSON.stringify(response.data);
    var object = JSON.parse(jsonObject);
    console.log(object.location.name);
    res.render("index", {
      city: object.location.name,
      country: object.location.country,
    });
  });
});

// res.render("index", {
//   city: city,
//   country: country,
// });
// });
module.exports = router;
