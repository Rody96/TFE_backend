const Temperature = require("../models/temperature.model");

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

exports.findOneTemperatureMeasure = (req, res) => {
  const id = req.params.id;

  Temperature.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving temperature measure with id=" + id
      });
    });
};