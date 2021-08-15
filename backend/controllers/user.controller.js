const db = require("../models");
const Users = db.user;
const sequelize = db.sequelize;


exports.getFanState = function(req, res) {
  sequelize.query('select fanState from tfe.users where id = ' + req.query.id)
     .then(results => res.json(results[0]))
     .catch(error => res.status(400).json(error));
};

exports.updateFanState = function(req, res) {
  Users.update(
      { fanState: req.query.fanState},
      { where: { id: req.query.id } }
    ).then(results => res.json(results))
    .catch(error => res.status(400).json(error));
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};