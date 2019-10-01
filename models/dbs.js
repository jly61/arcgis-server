const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbSchema = new Schema({
    'Station_Id_C': String,
    'coordinates': Array,
    'name': String
});

module.exports = mongoose.model('sc_geojson', dbSchema, 'sc_geojson');