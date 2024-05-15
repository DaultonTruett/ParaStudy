require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const passport = require('passport');

// DB
require('./app_api/models/db');

require('./app_api/config/passport');

// define routes
const indexRouter = require('./app_server/routes/index');

const cardiacRouter = require('./app_server/routes/cardiac');
const cardiacMedicationsRouter = require('./app_server/routes/cardiacMedications');
const algorithmsRouter = require('./app_server/routes/algorithms');

const medicalRouter = require('./app_server/routes/medical');
const medicalMedicationsRouter = require('./app_server/routes/medicalMedications');
const medicalProtocolsRouter = require('./app_server/routes/medicalProtocols');

const traumaRouter = require('./app_server/routes/trauma');
const traumaMedicationsRouter = require('./app_server/routes/traumaMedications');
const traumaProtocolsRouter = require('./app_server/routes/traumaProtocols');

const usersRouter = require('./app_server/routes/users');

const apiRouter = require('./app_api/routes/index');


const app = express();

// view engine setup
// add "app_server" when restructring architecture
app.set('views', path.join(__dirname, 'app_server', 'views'));

hbs.registerPartials(__dirname + '/app_server/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

app.use(passport.initialize());


//CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// wire routes to views
app.use('/', indexRouter);

app.use('/cardiac', cardiacRouter);
app.use('/cardiac/medications', cardiacMedicationsRouter);
app.use('/cardiac/algorithms', algorithmsRouter);

app.use('/medical', medicalRouter);
app.use('/medical/medications', medicalMedicationsRouter);
app.use('/medical/algorithms', medicalProtocolsRouter);


app.use('/trauma', traumaRouter);
app.use('/trauma/medications', traumaMedicationsRouter);
app.use('/trauma/protocols', traumaProtocolsRouter);

app.use('/users', usersRouter);

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
