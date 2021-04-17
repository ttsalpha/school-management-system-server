const express = require('express');
const router = express.Router();


const statisticRouter = require("../controllers/statistic.controller");

// Retrieve the transcript of class
router.get("/id/:ID/:role", statisticRouter.findAll);

module.exports = router;