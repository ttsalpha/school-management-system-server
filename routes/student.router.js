const express = require('express');
const router = express.Router();


const studentRouter = require("../controllers/student.controller");

// Retrieve a List of students with teacher ID
router.get("/id/:ID/:role", studentRouter.findAll);

// Retrieve a profile of a student with student ID
router.get("/search/:ID", studentRouter.findOne);

// Create a new Student
router.post("/create", studentRouter.create);

// Delete a Student with student ID
router.delete("/delete/:ID", studentRouter.delete);

module.exports = router;