const mongoose = require('mongoose');

const instalacionSchema = new mongoose.Schema({
    nombre: String,
    monto: Number,
    reservas: [{type: mongoose.Schema.ObjectId, ref:'reserva'}]
});

module.exports = mongoose.model('instalacion', instalacionSchema);