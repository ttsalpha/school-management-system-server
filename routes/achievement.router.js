const express = require('express');
const router = express.Router();

const achievementRouter = require('../controllers/achievement.controller');

// Create a new Achievement
router.post("/create", achievementRouter.create);


module.exports = router;