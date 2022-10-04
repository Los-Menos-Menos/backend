const mongoose = require('mongoose');

const anuncioSchema = new mongoose.Schema({
    titulo: String,
    mensaje: String,
    fecha: Date,
    autor: String
});

module.exports = mongoose.model('anuncio', anuncioSchema);