//气象站查询模型

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    'Station_Id_C': String,
    'Station_name': String,
    'lat': Number,
    'lon': Number,
    'Air_pre_alt': Number,
    'Observe_alt': Number
});

module.exports = mongoose.model('station_info', stationSchema,'station_info');