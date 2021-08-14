const express = require('express');
const router = express.Router();
const controllerAirQuality = require("../controllers/airQuality.controller");

    //Add new air quality measure
    router.post('/add', controllerAirQuality.addAirQualityMeasure);
    //Get all PPM measurements
    router.get('/all', (req, res) => controllerAirQuality.getAllppmMeasures(req, res));
    //Get PPM by day
    router.get('/day', (req,res) => controllerAirQuality.getppmByDay(req, res))
    //Search one air quality measure
    router.get("/:id", controllerAirQuality.findOneAirQualityMeasure);
  
    module.exports = router;
