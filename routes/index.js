var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var collection = req.db.get("users");
    collection.find({}, {}, function (err, docs) {
        res.render('index', {
            title: 'Express ' + process.env.FACEBOOK_KEY,
            length: docs.length,
            user: req.user
        });
    });

});

module.exports = router;