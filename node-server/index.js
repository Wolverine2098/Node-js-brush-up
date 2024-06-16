const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("hello from home page");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name} your age is ${req.query.age}`);
});

app.get("/profile", (req, res) => {
  return res.send("this is a profile change");
});

app.listen(8000, () => console.log("server started"));
