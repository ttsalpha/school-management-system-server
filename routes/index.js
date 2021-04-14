const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('base', {title: 'Express'});
// });

router.get('/', (req, res) => {
  res.render('index', {title: "Login System"});
})

module.exports = router;
