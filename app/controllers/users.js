var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {

    loadAll: function (req, res) {
        if (req.user.isAdmin) {
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
        req.user.admin = req.user.isAdmin;
        res.json(req.user);
    },

    update: function (req, res) {
        var user = req.body;

        var toWrite = {
            tagId: user.tagId
        };

        if (req.user.isAdmin) {
            toWrite.admin = user.admin;
            toWrite.validTill = user.validTill;
        } else {
            if (user._id != req.user._id) {
                res.status(500).json({});
            }
        }

        User.findOneAndUpdate({
                _id: user._id
            }, toWrite,
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