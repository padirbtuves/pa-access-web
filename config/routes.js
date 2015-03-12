module.exports = function (app, passport) {

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email'
        }));

    app.get('/oauth2callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
        });
}