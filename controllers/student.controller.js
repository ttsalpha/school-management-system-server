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

// Create and Save a new Student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Student
  const student = new Student({
    studentID: req.body.studentID,
    fullName: req.body.fullName,
    gender: req.body.gender,
    birthday: req.body.birthday,
    cccd: req.body.cccd,
    className: req.body.className,
    addressName: req.body.addressName
  });

  // Save Student in the database
  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student."
      });
    else res.send(data);
  });
};

// Delete a Student with the specified student ID in the request
exports.delete = (req, res) => {
  Student.delete(req.params.ID, (err) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.ID
        });
      }
    } else res.send({message: `Student was deleted successfully! ID: ${req.params.ID}`});
  });
};

// Update a Student identified by the student ID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Student.updateById(
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Student"
          });
        }
      } else res.send(data);
    }
  );
};