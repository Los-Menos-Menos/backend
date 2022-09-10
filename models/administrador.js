const mongoose = require('mongoose');

const administradorSchema = new mongoose.Schema({
    nombre: String,
    rut: Number,
    email: String
});

module.exports = mongoose.model('administrador', administradorSchema);