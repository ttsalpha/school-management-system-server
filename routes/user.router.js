const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const router = express.Router();

const Account = require('../models/account.model')

const userData = {};

let refreshTokens = [];
const accessTokenSecret = 'random';
const refreshTokenSecret = 'refresh';


router.use(bodyParser.json());

router.post('/login', (req, res) => {
  // read username and password from request body
  console.log(req.body)
  const {username, password} = req.body;
  console.log(username, password);
  console.log('ok1' + userData);

  Account.findByUsername(username, (err, userData) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Account with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Account with username " + req.params.username
        });
      }
    } else {
      if (userData.username === username && userData.password === password) {
        // generate an access token
        const accessToken = jwt.sign({
          username: userData.username,
          role: userData.role
        }, accessTokenSecret, {expiresIn: '2000'});
        const refreshToken = jwt.sign({
          username: userData.username,
          role: userData.role
        }, refreshTokenSecret);

        refreshTokens.push(refreshToken);
        console.log(userData)

        res.json({
          accessToken,
          refreshToken,
          "teacherID": userData.teacherID,
          "userRole": userData.role
        });
      } else {
        res.send('Username or password incorrect');
      }
    }
  })
});

router.post('/token', (req, res) => {
  const {token} = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({
        username: user.username,
        role: user.role
      }, accessTokenSecret,
      {expiresIn: '2000'});

    res.json({
      accessToken
    });
  });
});

router.post('/logout', (req, res) => {
  const {token} = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
});

module.exports = router;