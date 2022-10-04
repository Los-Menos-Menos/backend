const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    fecha: Date,
    pagado: Boolean,
    instalacion: {type: mongoose.Schema.ObjectId, ref:'instalacion'},
    residente: {type: mongoose.Schema.ObjectId, ref:'residente'}
});

module.exports = mongoose.model('reserva', reservaSchema);