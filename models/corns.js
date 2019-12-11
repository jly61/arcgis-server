const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbSchema = new Schema({
    'period': String,
    'min_temp': Number,
    'max_temp': Number,
    'suit': String
});

module.exports = mongoose.model('corn', dbSchema, 'corn');
