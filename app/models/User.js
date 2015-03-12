var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var UserSchema = new mongoose.Schema({
    googleId: String,
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});
UserSchema.plugin(findOrCreate);
var User = mongoose.model('User', UserSchema);