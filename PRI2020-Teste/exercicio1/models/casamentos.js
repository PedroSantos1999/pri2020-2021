const mongoose = require('mongoose')


var casamentosSchema = new mongoose.Schema({
    date: String,
    title: String,
    id: String,
    href: String
});

module.exports = mongoose.model('casamentos', casamentosSchema)