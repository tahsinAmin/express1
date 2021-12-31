// Work needs to be done.
let wA = ["Bangladesh"];
let weatherSave = [
  {
    location: {
      name: "Dhaka",
      region: "",
      country: "Bangladesh",
      lat: 23.72,
      lon: 90.41,
      tz_id: "Asia/Dhaka",
      localtime_epoch: 1640709938,
      localtime: "2021-12-28 22:45",
    },
    current: {
      last_updated_epoch: 1640709000,
      last_updated: "2021-12-28 22:30",
      temp_c: 20.5,
      temp_f: 68.9,
      is_day: 0,
      condition: {
        text: "Clear",
        icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
        code: 1000,
      },
      wind_mph: 4.5,
      wind_kph: 7.2,
      wind_degree: 6,
      wind_dir: "N",
      pressure_mb: 1017.0,
      pressure_in: 30.03,
      precip_mm: 0.0,
      precip_in: 0.0,
      humidity: 45,
      cloud: 6,
      feelslike_c: 20.5,
      feelslike_f: 68.9,
      vis_km: 10.0,
      vis_miles: 6.0,
      uv: 1.0,
      gust_mph: 8.9,
      gust_kph: 14.4,
    },
  },
];

// console.log(weatherSave);

function test(locate) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=${locate}&aqi=no`
  )
    .then((response) => {
      return response.json();
    })
    .then((apiData) => {
      console.log(apiData, apiData.location.name);
      wA.push(apiData.location.country);
      weatherSave.push(apiData);
      console.log(wA);
      console.log(weatherSave);
    });
}

let locate = "usa";
let idx = wA.indexOf(locate);
if (idx == -1) {
  test(locate);
} else {
  console.log("yes");
  console.log(wA[idx]);
}
