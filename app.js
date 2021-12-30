const express = require("express");
const app = express();

// Middleware
app.use(express.static("public"));

// import Router
const weatherRoute = require("./routes/weather");

// use View Engine
app.set("view engine", "ejs");

// Middleware route
app.use("/", weatherRoute);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// https://www.youtube.com/watch?v=PozEoga90r8
