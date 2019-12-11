const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbSchema = new Schema({
    'city_id': Number,
    'Station_name': String,
});

module.exports = mongoose.model('city_info', dbSchema, 'city_info');
