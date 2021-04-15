const Account = require('../models/account.model')

// Find a single Account with a ID
exports.findOne = (req, res) => {
  Account.findById(req.params.ID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with id ${req.params.ID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with id " + req.params.ID
        });
      }
    } else res.send(data);
  });
};

