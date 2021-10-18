var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// CONST YOUR SESSION, PASSPORT, and OVERRIDE
const session = require('express-session');
const passport = require('passport');
const methodOverride = require("method-override");

// REQUIRE DOTENV, Config/Db, and Config/Passport
require('dotenv').config();
require('./config/database');
require('./config/passport');

// ADD ROUTES HERE; DOUBLE-CHECK APP.USE OF ROUTES BELOW
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');
const shelvesRouter = require('./routes/shelves');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// ADD USE ROUTES HERE
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/', reviewsRouter);
app.use('/shelves', shelvesRouter);


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