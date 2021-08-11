const db = require("../models");
const AirQuality = db.airquality;

const Op = db.Sequelize.Op;

exports.addAirQualityMeasure = (req, res) => {
  if (!req.body.ppm) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const airQualityMeasure = {
    ppm: req.body.ppm,
    userId: req.body.userId,
    published: req.body.published ? req.body.published : false
  };

  AirQuality.create(airQualityMeasure)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the air quality measure."
      });
    });
};

exports.findOneAirQualityMeasure = (req, res) => {
  const id = req.params.id;

  AirQuality.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving air quality measure with id=" + id
      });
    });
};

exports.getAllppmMeasures = function(req, res) {
  AirQuality.findAll()
      .then(results => res.json(results))
      .catch(error => res.status(400).json({error}));
};