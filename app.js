var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

// DB
require('./app_api/models/db');

// define routes
var indexRouter = require('./app_server/routes/index');
var cardiacRouter = require('./app_server/routes/cardiac');

var usersRouter = require('./app_server/routes/users');

const apiRouter = require('./app_api/routes/index');

var app = express();


// view engine setup
// add "app_server" when restructring architecture
app.set('views', path.join(__dirname, 'app_server', 'views'));

hbs.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// wire routes to views
app.use('/', indexRouter);
app.use('/cardiac', cardiacRouter);
app.use('/users', usersRouter);

app.use('/api', apiRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
