const Statistic = require('../models/statistic.model')

// Find the transcript of class with teacher id
exports.findAll = (req, res) => {
  Statistic.getAll(req.params.ID, req.params.role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found the transcript of class with teacher id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving the transcript of class with teacher id " + req.params.ID
        });
      }
    } else res.send(data);
  });
};
