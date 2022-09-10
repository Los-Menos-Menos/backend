const mongoose = require('mongoose');

const residenteSchema = new mongoose.Schema({
    nombre: String,
    rut: Number,
    email: String
});

module.exports = mongoose.model('residente', residenteSchema);