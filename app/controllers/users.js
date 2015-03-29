var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    loadAll: function (req, res) {
        User.find({}, function (err, users) {
            if (!err) {
                res.json(users);
            } else {
                res.status(500).json(err);
            }
        })
    },
    
    currentUser: function(req, res) {
        res.json(req.user);
    }
}   