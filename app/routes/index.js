var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express ' + process.env.FACEBOOK_KEY,
        user: JSON.stringify(req.user)
    });

});

module.exports = router;