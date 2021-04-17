const express = require('express');
const router = express.Router();


const profileRouter = require("../controllers/profile.controller");

// Retrieve a single Profile with teacherId
router.get("/id/:ID", profileRouter.findOne);

module.exports = router;