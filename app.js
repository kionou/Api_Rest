var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var livreRouter = require('./routes/livre');
var categorieRouter = require('./routes/categorie');


var app = express();
mongoose.connect(process.env.MONGO_URL)
.then((resultat)=>{
  console.log('Connecter avec success la base de donnée');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/uploads',express.static('./uploads'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livre', livreRouter);
app.use('/categorie', categorieRouter);


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

})

.catch((error)=>{
  console.log("base de donnée non connect",error);
})

module.exports = app;
