const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

var router = express.Router();

const userData = [
  {
    username: 'admin',
    password: '123',
    role: 'admin'
  },
  {
    username: 'member',
    password: '321',
    role: 'member'
  }
];

let refreshTokens = [];
const accessTokenSecret = 'random';
const refreshTokenSecret = 'refresh';


router.use(bodyParser.json());

router.post('/login', (req, res) => {
  // read username and password from request body
  console.log(req.body)
  const {username, password} = req.body;
  console.log(username, password);
  // filter user from the user array by username and password
  const user = userData.find(u => {
    return u.username === username && u.password === password
  });

  if (user) {
    // generate an access token
    const accessToken = jwt.sign({
      username: userData.username,
      role: userData.role
    }, accessTokenSecret, {expiresIn: '2000'});
    const refreshToken = jwt.sign({
      sername: userData.username,
      role: userData.role
    }, refreshTokenSecret);

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
    });
  } else {
    res.send('Username or password incorrect');
  }
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