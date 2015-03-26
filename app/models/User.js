var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    google: {},
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});

UserSchema.statics = {
    load: function (options, cb) {
        options.select = options.select || 'name username';
        var op = this.findOne(options.criteria, cb);
    }
}

mongoose.model('User', UserSchema);