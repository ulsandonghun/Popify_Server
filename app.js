const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const popupsRouter = require('./routes/popups');
const goodsRouter = require('./routes/goods');   // 수정된 부분
const mapsRouter = require('./routes/maps');     // 수정된 부분
const reviewsRouter = require('./routes/reviews'); // 수정된 부분


const app = express();

// mongoose setup
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/popups',popupsRouter);
app.use('/goods',goodsRouter);   // 수정된 부분
app.use('/maps',mapsRouter);     // 수정된 부분
app.use('/reviews',reviewsRouter); // 수정된 부분

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
