const Humidity = require("../models/humidity.model");

exports.addHumidityeMeasure = (req, res) => {
  if (!req.body.airHumidity) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const humidityMeasure = {
    airHumidity: req.body.airHumidity,
    userId: req.body.userId,
    published: req.body.published ? req.body.published : false
  };

  Humidity.create(humidityMeasure)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the humidity measure."
      });
    });
};

exports.getAllHumidityMeasures = (req,res) => {
	Humidity.findAll()
	.then(results => res.json(results))
	.catch(error => res.status(400).json({error}));
};

exports.findOneHumidityMeasure = (req, res) => {
  const id = req.params.id;

  Humidity.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Humidity with id=" + id
      });
    });
};
