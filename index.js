const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const schedule = require('node-schedule');
const moment = require('moment');
const momenttz = require('moment-timezone');
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// specify the view engine and file locations
app.set('views', path.join(__dirname, '/public/html'));
app.set('view engine', 'ejs');
//Configure the .env 
dotenv.config();
// DB config
const db = process.env.MONGO_URI;
//Connect to MONGODB
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err, 'there is an error'));
//load models
require('./models/index.js');
app.use(express.static(path.join(__dirname, "/server")));

const routes = require("./api/index");
app.use(express.static(path.join(__dirname, "/public")));
app.get("/", (req, res)=>{
  res.render("HomepageV2", {});
})
app.get("/add", (req, res)=>{
  res.sendFile(path.join(__dirname, "/server/test.html"));
})
app.get("/event/:id", (req, res)=>{
  res.render("event", {id: req.params.id})
})
app.get("/movementDes", (req, res)=>{
  res.sendFile(path.join(__dirname, "/public/html/movementDes.html"))
})
app.use("/api/event", routes.events);
app.listen(5000, ()=>{
  console.log("Hello");
});