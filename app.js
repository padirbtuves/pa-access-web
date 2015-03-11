var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var monk = require('monk');

//provide a sensible default for local development
var dbName = "paaccess"

var mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + dbName;

if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + dbName;
}

var db = monk(mongodb_connection_string);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var passport = require('passport'),
    GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
        returnURL: 'http://' + process.env.OPENSHIFT_GEAR_DNS + '/auth/google/return',
        realm: 'http://' + process.env.OPENSHIFT_GEAR_DNS + '/'
    },
    function (identifier, profile, done) {
        User.findOrCreate({
            openId: identifier
        }, function (err, user) {
            done(err, user);
        });
    }
));
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;