var express = require("express");
var app = express();
const dotenv = require("dotenv");
dotenv.config();
let router = express.Router();
app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

// app.get("/json", (req, res) => {
//   let response;
//   if (process.env.MESSAGE_STYLE == "uppercase") {
//     response = "Hello json".toUpperCase();
//   } else {
//     response = "Hello json"; //ok
//   }
//   res.json({ message: response });
// });
// app.get("/json", (req, res, next) => {
//   let methode = req.method;
//   let path = req.path;
//   let ip = req.ip;
//   res.json({ methode: methode + " " + path + " - " + ip });
//   next();
// });

app.use("/public", express.static(__dirname + "/public"));
app.use(function (req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);
module.exports = app;
