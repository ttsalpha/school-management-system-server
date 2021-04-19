const express = require('express');
const router = express.Router();

const parentRouter = require('../controllers/parents.controller');

// Create a new Parents
router.post("/create", parentRouter.create);

module.exports = router;