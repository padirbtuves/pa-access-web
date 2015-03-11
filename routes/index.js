var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var collection = req.db.get("users");
    collection.find({}, {}, function (err, docs) {
        res.render('index', {
            title: 'Express ' + process.env.OPENSHIFT_GEAR_DNS,
            length: docs.length
        });
    });

});

module.exports = router;