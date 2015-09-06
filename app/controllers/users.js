var mongoose = require('mongoose');
var User = mongoose.model('User');
var Log = mongoose.model('Log');

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

    isSubscriptionValid: function (req, res) {
        var query = req.query;
        var result = {
            id: query.id,
            valid: false
        };

        User.findOne({
            tagId: query.id
        }, function (err, user) {
            if (err || !user) {
                res.json(result);
            } else {
                result.id = user.tagId;
                result.valid = user.validTill > new Date();
                result.till = user.validTill;

                var log = new Log({
                    who: user.email,
                    when: new Date(),
                    valid: result.valid
                });

                log.save(function (err) {
                    res.json(result);
                });
            }
        });
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