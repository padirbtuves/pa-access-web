var users = require('../app/controllers/users');

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
    
    app.get('/app', function(req, res) {
        res.redirect("/app.html");
    })
    
    app.get('/app/user/all', function(req, res) {
        users.loadAll(req, res);
    });
    
    app.get('/app/user/current', function(req, res) {
        users.currentUser(req, res);
    });
    
    app.post('/app/user/update', function(req, res) {
        users.update(req, res);
    });
    
    app.get('/auth/nfc', function(req, res) {
        var all = [
            "2836153826",
            "3630889794",
            "3576372668",
            "764286626",
        ];
        
        var result = {};
        result.id = req.query.id;
        result.valid = all.indexOf(result.id) != -1;
        result.till = "assad";
        
        res.json(result);
    });
    
    app.use('/', function (req, res) {
        return res.render("index", {
            user: req.user
        });
    });


}