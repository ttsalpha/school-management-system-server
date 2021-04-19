const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user.router');
const accountRouter = require('./routes/account.router');
const profileRouter = require('./routes/profile.router');
const teacherRouter = require('./routes/teacher.router');
const studentRouter = require('./routes/student.router');
const statisticRouter = require('./routes/statistic.router');
const parentsRouter = require('./routes/parents.router');
const achievementRouter = require('./routes/achievement.router');

const app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/account', accountRouter);
app.use('/profile', profileRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/statistic', statisticRouter);
app.use('/parents', parentsRouter);
app.use('/achievement', achievementRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
