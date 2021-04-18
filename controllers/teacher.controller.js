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
  Profile.findById(req.params.ID, 'admin', (err, data) => {
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


// Create and Save a new Teacher
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Teacher
  const teacher = new Teacher({
    teacherID: req.body.teacherID,
    fullName: req.body.fullName,
    gender: req.body.gender,
    birthday: req.body.birthday,
    cccd: req.body.cccd,
    position: req.body.position,
    addressName: req.body.addressName,
    phone: req.body.phone,
    email: req.body.email,
    reportsTo: req.body.reportsTo
  });

  // Save Teacher in the database
  Teacher.create(teacher, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teacher."
      });
    else res.send(data);
  });
};
