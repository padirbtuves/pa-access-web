/*!
 * Module dependencies.
 */

var mongoose = require('mongoose');
var User = mongoose.model('User');

var google = require('./passport/google');

/**
 * Expose
 */

module.exports = function (passport, config) {
    // serialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user._id)
    })

    passport.deserializeUser(function (id, done) {
        User.load({
            criteria: {
                _id: id
            }
        }, function (err, user) {
            done(err, user)
        })
    })

    // use these strategies
    passport.use(google);
};