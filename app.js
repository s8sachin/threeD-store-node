var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var indexRouter = require('./routes/index');
var tdObjects = require('./routes/tdObjects');
var categories = require('./routes/categories');
var userSession = require('./routes/userSession');
var user = require('./routes/user');

var app = express();

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/tdObjects', { useNewUrlParser: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));
mongoose.set('debug', true);

// app.use(passport.initialize());
require('./config/passport');
// const secureRoute = require('./routes/secure-route');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// routes
app.use('/', indexRouter);
app.use('/tdObjects', passport.authenticate('jwt', { session : false }), tdObjects);
app.use('/categories', passport.authenticate('jwt', { session : false }), categories );
app.use('/user', passport.authenticate('jwt', { session : false }), user );
app.use('/userSession', userSession);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res
  .status(err.status || 500)
  .json({ message: 'error' });
});

module.exports = app;
