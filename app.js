var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var sessionRouter = require('./routes/session');
var adminRouter = require('./routes/admin');
var noticiaFavRouter = require('./routes/noticiaFav');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/session', sessionRouter);
app.use('/admin', adminRouter);
app.use('/notifav', noticiaFavRouter);



module.exports = app;
