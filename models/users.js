const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    'name': String,
    'password': String,
    'role': {
        type: String,
        default: 'general'
    },
});

module.exports = mongoose.model('user_info', userSchema, 'user_info');
