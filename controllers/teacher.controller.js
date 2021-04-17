const Teacher = require('../models/teacher.model')

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
