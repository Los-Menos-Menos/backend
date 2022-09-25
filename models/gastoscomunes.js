const mongoose = require('mongoose');

const gastoscomunesSchema = new mongoose.Schema({
    residente: {type: mongoose.Schema.ObjectId, ref:'residente'},
    fecha: Date,
    monto: Number,
    detalle: String,
    pagado: Boolean    
});

module.exports = mongoose.model('gastoscomunes', gastoscomunesSchema);