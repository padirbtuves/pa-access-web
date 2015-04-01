var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    loadAll: function (req, res) {
        if (req.user.email == "vincnetas@gmail.com") {
            User.find({}, function (err, users) {
                if (!err) {
                    res.json(users);
                } else {
                    res.status(500).json(err);
                }
            });
        } else {
            res.status(500).json({});
        }
    },

    currentUser: function (req, res) {
        res.json(req.user);
    },

    update: function (req, res) {
        var user = req.body;
        if (user._id != req.user._id) {
            res.status(500).json({});
        }
        
        User.findOneAndUpdate({
                _id: user._id
            }, {
                tagId: user.tagId
            },
            function (err, user) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.json(user);
                }
            }
        );
    }
}