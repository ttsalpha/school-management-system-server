const Student = require('../models/student.model')

// Find the list of student with teacher id
exports.findAll = (req, res) => {
  Student.getAll(req.params.ID, req.params.role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found list of student with teacher id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving list of student with teacher id " + req.params.ID
        });
      }
    } else res.send(data);
  });
};

// Find a Profile of a student with a ID
exports.findOne = (req, res) => {
  Student.findById(req.params.ID, (err, data) => {
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
