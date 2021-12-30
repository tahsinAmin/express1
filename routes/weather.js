const router = require("express").Router();
const axios = require("axios");
// const path = require("path");
// require("dotenv").config();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/all/:country/:city", ({ params }, res) => {
  const { country, city } = params;
  const url_api = `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${city}&aqi=no`;
  axios
    .get(url_api, async (res) => {
      await res.json();
    })
    .then((data) => console.log(data));
});

// res.render("index", {
//   city: city,
//   country: country,
// });
// });
module.exports = router;
