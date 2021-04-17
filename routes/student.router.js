const express = require('express');
const router = express.Router();


const studentRouter = require("../controllers/student.controller");

// Retrieve a List of teachers
router.get("/id/:ID/:role", studentRouter.findAll);

module.exports = router;