//连接mongodb数据库
const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/non_space',{ useNewUrlParser: true });
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected success');
    });
    mongoose.connection.on('error', () => {
        console.log('MongoDB connected failed');
    });mongoose.connection.on('disconnected', () => {
        console.log('MongoDB connected disconnected');
    });
};