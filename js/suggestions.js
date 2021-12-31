// Response body is showing null
// function test() {
//   fetch(
//     "http://api.weatherapi.com/v1/current.json?key=e6a73467a3e94aa184c122435212812&q=Bangladesh&aqi=no",
//     {
//       // method: "GET",
//       // mode: "no-cors",
//     }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((apiData) => {
//       console.log(apiData, apiData.location.name);
//     });
// }
// test();

//   Sample Data

let sample = [
  {
    id: 503358,
    Name: "Province of Ragusa, Sicily, Italy",
    Count: 51,
    SlashName: "italy/sicily/province-of-ragusa-vacation-rentals/g100503358",
  },
  {
    id: 416298,
    Name: "Jerusalem, Jerusalem District, Israel",
    Count: 4,
    SlashName: "Israel/Jerusalem-vacation-rentals/g2579/",
  },
  {
    id: 407700,
    Name: "Jerusalem District, Israel",
    Count: 4,
    SlashName: "israel/jerusalem-district-vacation-rentals/g100407700",
  },
  {
    id: 686343,
    Name: "Marausa, Trapani, Italy",
    Count: 2,
    SlashName:
      "sicily/province-of-trapani/trapani/marausa-vacation-rentals/g100686343",
  },
  {
    id: 414003,
    Name: "Husafell, West Region, Iceland",
    Count: 2,
    SlashName: "iceland/west-region/husafell-vacation-rentals/g100414003",
  },
  {
    id: 414006,
    Name: "Husavik, Northeast Region, Iceland",
    Count: 2,
    SlashName: "iceland/northeast-region/husavik-vacation-rentals/g100414006",
  },
  {
    id: 574074,
    Name: "Llanddeusant, Anglesey, United Kingdom",
    Count: 1,
    SlashName:
      "wales/north-wales/anglesey/llanddeusant-vacation-rentals/g100574074",
  },
];

let suggestions = sample.map((d) => d["Name"]);
