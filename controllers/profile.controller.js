const Profile = require('../models/profile.model')

// Find a single Profile with a ID
exports.findOne = (req, res) => {
  Profile.findById(req.params.ID, req.params.role, (err, data) => {
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
