const mongoose = require('mongoose');

const estadodecuentaSchema = new mongoose.Schema({
    residente: {type: mongoose.Schema.ObjectId, ref:'residente'},
    morosidad: Boolean,
    multas: [{type: mongoose.Schema.ObjectId, ref:'multa'}],
    gastoscomuneslista: [{type: mongoose.Schema.ObjectId, ref:'gastocomunes'}],
    reservas: [{type: mongoose.Schema.ObjectId, ref:'reserva'}]
});

module.exports = mongoose.model('estadodecuenta', estadodecuentaSchema);