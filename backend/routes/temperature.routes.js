const express = require('express');
const router = express.Router();
const controllerTemperature = require("../controllers/temperature.controller");

  //Add new temperature measure
  router.post('/add', controllerTemperature.addTemperatureMeasure);
    //Get all temperature measurements
    router.get('/all', (req,res) => controllerTemperature.getAllTemperatureMeasures(req,res));
  //Search one temperature measure
  router.get("/:id", controllerTemperature.findOneTemperatureMeasure);

  module.exports = router;