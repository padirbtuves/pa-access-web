var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LogSchema = new Schema({
    who: String,
    when: Date,
    valid: Boolean
});

mongoose.model('Log', LogSchema);