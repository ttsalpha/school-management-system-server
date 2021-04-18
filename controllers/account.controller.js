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

// Retrieve all Account from the database.
exports.findAll = (req, res) => {
  Account.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving account."
      });
    else res.send(data);
  });
};

// Find a single Account with a ID
exports.findOneUsername = (req, res) => {
  Account.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

// Create and Save a new Account
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Account
  const account = new Account({
    username: req.body.username,
    password: req.body.password,
    teacherID: req.body.teacherID,
    role: req.body.role
  });

  // Save Account in the database
  Account.create(account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Account."
      });
    else res.send(data);
  });
};
