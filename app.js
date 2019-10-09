require('custom-env').env()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyparser = require('body-parser');
var session = require('express-session');
var mongoose = require('./connection');
var indexRouter = require('./routes/index');
var router = require('./routes/users');
var surveyRouter = require('./routes/surveyRouter');
var userrouter = require('./routes/userrouter');
var routes = require('./routes/routes');
var app = express();
app.use(cors({ Origin:'http://localhost:4200' })); 
app.use(bodyparser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(
  {
    secret:'secret-key',
    saveUninitialized:true,
    resave:false
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/surveys', routes);
app.use('/', indexRouter);
app.use('/users', router);
app.use('/survey',surveyRouter);
app.use('/sql',userrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

function auth ( req,res,next ) {
  console.log(req.user);
  if(!req.user){
    console.log('err');
  }else{
    next();
  }
}

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