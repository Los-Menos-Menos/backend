const mongoose = require('mongoose');

const multaSchema = new mongoose.Schema({
    residente: {type: mongoose.Schema.ObjectId, ref:'residente'},
    monto: Number,
    detalle: String,
    pagado: Boolean
});

module.exports = mongoose.model('multa', multaSchema);