const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    'Station_Id_C': String,
    'Year': Number,
    'Mon': Number,
    'Day': Number,
    'Hour': Number,
    'PRS': Number,
    'TEM': Number,
    'TEM_Max': Number,
    'TEM_Min': Number,
    'RHU': Number,
    'PRE_1h': Number,
});

module.exports = mongoose.model('hour_06260702', weatherSchema,'hour_06260702');
