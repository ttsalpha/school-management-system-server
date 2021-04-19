const Achievement = require('../models/achievement.model');

// Create and Save a new Achievement
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Achievement
  const achievement = new Achievement({
    studentID: req.body.studentID,
    gradeMath: req.body.gradeMath,
    gradeLiterature: req.body.gradeLiterature,
    gradeEnglish: req.body.gradeEnglish,
    ranking: req.body.ranking
  });

  // Save Student in the database
  Achievement.create(achievement, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Achievement."
      });
    else res.send(data);
  });
};
