var mongoose = require('mongoose');
var Log = mongoose.model('Log');

module.exports = {

    lastLogs: function (callback) {
        Log.find({}, function (err, logs) {
            if (err || !logs) {
                logs = {};
            }

            callback(logs, err);
        });
    }
}