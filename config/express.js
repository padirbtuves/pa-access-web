/**
 * Module dependencies.
 */
var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var multer = require('multer');
var swig = require('swig');

var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config');


var favicon = require('serve-favicon');
var logger = require('morgan');

/**
 * Expose
 */
module.exports = function (app, passport) {

    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Static files middleware
    app.use(express.static(config.root + '/public'));

    app.use(logger('dev'));


    // set views path, template engine and default layout
    swig.setDefaults({ cache: false });
    app.engine('html', swig.renderFile);
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'html');
    app.set('view cache', false);



    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(multer());


    // CookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({
        secret: 'secret'
    }));
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "pkg.name",
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());
};