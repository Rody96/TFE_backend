const express = require('express');
const router = express.Router();
const controllerAirQuality = require("../controllers/airQuality.controller");

    //Add new air quality measure
    router.post('/add', controllerAirQuality.addAirQualityMeasure);
    //Search one air quality measure
    router.get("/:id", controllerAirQuality.findOneAirQualityMeasure);
  
    module.exports = router;