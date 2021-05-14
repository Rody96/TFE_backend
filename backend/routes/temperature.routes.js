const express = require('express');
const router = express.Router();
const controllerTemperature = require("../controllers/temperature.controller");

  //Add new temperature measure
  router.post('/add', controllerTemperature.addTemperatureMeasure);
  //Search one temperature measure
  router.get("/:id", controllerTemperature.findOneTemperatureMeasure);

  module.exports = router;