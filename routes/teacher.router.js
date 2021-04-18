const express = require('express');
const router = express.Router();


const teacherRouter = require("../controllers/teacher.controller");

// Retrieve a List of teachers
router.get("/", teacherRouter.findAll);

// Retrieve a profile of a student with student ID
router.get("/search/:ID", teacherRouter.findOne);

// Create a new Teacher
router.post("/create", teacherRouter.create);

module.exports = router;