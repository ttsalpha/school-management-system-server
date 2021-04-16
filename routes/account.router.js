const express = require('express');
const router = express.Router();


const accountRouter = require("../controllers/account.controller");

// Retrieve a single Account with customerId
router.get("/id/:ID", accountRouter.findOne);

// Retrieve all Account
router.get("/", accountRouter.findAll);

// Retrieve a single Account with username
router.get("/username/:username", accountRouter.findOneUsername);

module.exports = router;