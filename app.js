var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const mongoose = require('mongoose');
// const cors = require('cors');


var config = require('./config/config');
config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tempsRouter = require('./routes/temps');
var weathersRouter = require('./routes/weathers');
var stationsRouter = require('./routes/stations');
var ricesRouter = require('./routes/rices');
var cornsRouter = require('./routes/corns');
var wheatsRouter = require('./routes/wheats');
var citysRouter = require('./routes/citys');
var cropsRouter = require('./routes/crops');
var disastersRouter = require('./routes/disasters');
var caiyunRouter = require('./routes/caiyun');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('.html', ejs.__express) // 设置视图引擎后缀，为.html
app.set('view engine', 'html'); // 设置视图引擎为html

//解决跨域
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//解决跨域
// app.use(cors());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/temps', tempsRouter);
app.use('/weathers', weathersRouter);
app.use('/stations', stationsRouter);
app.use('/rices', ricesRouter);
app.use('/corns', cornsRouter);
app.use('/wheats', wheatsRouter);
app.use('/citys', citysRouter);
app.use('/crops', cropsRouter);
app.use('/disasters', disastersRouter);
app.use('/caiyun', caiyunRouter);

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
