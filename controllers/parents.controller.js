const Parents = require('../models/parents.model')

// Create and Save a new Parents
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Parents
  const parents = new Parents({
    studentID: req.body.studentID,
    nameMom: req.body.nameMom,
    phoneMom: req.body.phoneMom,
    jobMom: req.body.jobMom,
    nameDad: req.body.nameDad,
    phoneDad: req.body.phoneDad,
    jobDad: req.body.jobDad
  });

  // Save Parents in the database
  Parents.create(parents, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Parents."
      });
    else res.send(data);
  });
};

// Update a Parents identified by the student ID in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Parents.updateById(
    new Parents(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Parents.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Parents"
          });
        }
      } else res.send(data);
    }
  );
};