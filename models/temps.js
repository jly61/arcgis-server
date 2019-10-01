const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    'author': String,
    'title': String
});

module.exports = mongoose.model('article', articleSchema, 'article');