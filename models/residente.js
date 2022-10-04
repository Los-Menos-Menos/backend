const mongoose = require('mongoose');

const residenteSchema = new mongoose.Schema({
    nombre: String,
    rut: Number,
    email: String,
    estadodecuenta:{type: mongoose.Schema.ObjectId, ref:'estadodecuenta'},
});

module.exports = mongoose.model('residente', residenteSchema);