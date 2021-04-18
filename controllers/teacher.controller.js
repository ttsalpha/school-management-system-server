const Teacher = require('../models/teacher.model')
const Profile = require("../models/profile.model");

// Find a List of teachers
exports.findAll = (req, res) => {
  Teacher.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not found List."
        });
      } else {
        res.status(500).send({
          message: "Error retrieving List."
        });
      }
    } else res.send(data);
  });
};

// Find a Profile of a teacher with a ID
exports.findOne = (req, res) => {
  Profile.findById(req.params.ID, 'admin',(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Profile with id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Profile with id " + req.params.ID
        });
      }
    } else res.send(data);
  });
};
