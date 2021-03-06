const express = require('express');
const router = express.Router();
const controllerHumidity = require("../controllers/humidity.controller");

  //Add new humidity measure
  router.post('/add', controllerHumidity.addHumidityeMeasure);
  //Retrieve all humidity measurements
  router.get('/all', (req,res) => controllerHumidity.getAllHumidityMeasures(req,res));
  //Get humidity measurements by day
  router.get('/day', (req,res) => controllerHumidity.getHumidityByDay(req, res))
 
  module.exports = router;
