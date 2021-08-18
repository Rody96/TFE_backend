const db = require("../models");
const Temperature = db.temperature;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

exports.addTemperatureMeasure = (req, res) => {
  if (!req.body.temperature) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const temperatureMeasure = {
    temperature: req.body.temperature,
    userId: req.body.userId,
    published: req.body.published ? req.body.published : false
  };

  Temperature.create(temperatureMeasure)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the temperature measure."
      });
    });
};

exports.getAllTemperatureMeasures = function(req, res) {
  Temperature.findAll()
      .then(results => res.json(results))
      .catch(error => res.status(400).json({error}));
};

exports.getTemperatureByDay = function(req, res) {
  sequelize.query('select * from test.temperatures where DATE(createdAt) = '+ req.query.createdAt)
  .then(results => res.json(results[0]))
  .catch(error => res.status(400).json(error));
}