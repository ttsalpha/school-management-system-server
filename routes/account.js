const express = require('express');
const router = express.Router();


const account = require("../controllers/account.controller");

// Retrieve a single Account with customerId
router.get("/:ID", account.findOne);


module.exports = router;