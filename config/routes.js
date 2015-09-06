var users = require('../app/controllers/users');
var logs = require('../app/controllers/logs');

module.exports = function (app, passport) {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
        }));

    app.get('/oauth2callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function (req, res) {
            res.redirect('/app');
        });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/app', function (req, res) {
        res.redirect("/app.html");
    })

    app.get('/app/user/all', function (req, res) {
        users.loadAll(req, res);
    });

    app.get('/app/user/current', function (req, res) {
        users.currentUser(req, res);
    });

    app.post('/app/user/update', function (req, res) {
        users.update(req, res);
    });

    app.get('/auth/nfc', function (req, res) {
        users.isSubscriptionValid(req, res);
    });


    app.get('/log', function (req, res) {
        if (!req.isAuthenticated()) {
            return res.send(401);
        }
        
        logs.lastLogs(function (logs, err) {
            return res.render("log", {
                logs: logs,
                err: err
            });
        });
    });

    app.use('/', function (req, res) {
        return res.render("index", {
            user: req.user
        });
    });


}