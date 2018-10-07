const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const schedule = require('node-schedule');
const moment = require('moment');
const momenttz = require('moment-timezone');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
const routes = require("./api/index");
app.use("/api/event", routes.events);
app.listen(5000, ()=>{
  console.log("Hello");
});