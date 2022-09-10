const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    fecha: Date,
    pagado: Boolean,
    instalacion: {type: mongoose.Schema.ObjectId, ref:'instalacion'}
});

module.exports = mongoose.model('reserva', reservaSchema);