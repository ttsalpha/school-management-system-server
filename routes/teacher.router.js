const express = require('express');
const router = express.Router();


const teacherRouter = require("../controllers/teacher.controller");

// Retrieve a List of teachers
router.get("/", teacherRouter.findAll);

module.exports = router;