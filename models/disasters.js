const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disasterSchema = new Schema({
    'disaster_type': String,
    'norm': [
        {
            'level': String,
            'time': Number,
            'element': Number,
            'desc': String,
        }
    ],
});

module.exports = mongoose.model('disaster', disasterSchema, 'disaster');
