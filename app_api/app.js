require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const passport = require('passport');

// DB
require('./models/db');

require('./config/passport');

// define routes
const apiRouter = require('./routes/index');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());


//CORS
app.use('/api', (req, res, next) => {
  if(process.env.NODE_ENV === 'development'){
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL_DEV);

  }else{
    res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  };
  
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// wire routes
app.use('/api', apiRouter);


app.use( (err, req, res, next) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({message: err.name + ': ' + err.message});
  };
});


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
