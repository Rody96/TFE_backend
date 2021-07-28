const express = require('express');
const router = express.Router();
const controllerHumidity = require("../controllers/humidity.controller");

  //Add new humidity measure
  router.post('/add', controllerHumidity.addHumidityeMeasure);
  //Search one humidity measure
  router.get("/:id", controllerHumidity.findOneHumidityMeasure);
  //Retrieve all Humidity measurements
  router.get("/all", (req,res) => controllerHumidity.getAllHumidityMeasures(req,res));
 
  module.exports = router;
