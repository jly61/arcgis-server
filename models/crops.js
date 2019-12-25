const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name: String,
    norm: [
        {
            'period': String,
            'min_temp': Number,
            'max_temp': Number,
            'suit': String,
            'desc': String
        }
    ]
});

module.exports = mongoose.model('crop', cropSchema, 'crop');
