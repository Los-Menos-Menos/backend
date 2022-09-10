const mongoose = require('mongoose');

const gastoscomunesSchema = new mongoose.Schema({
    fecha: Date,
    pagado: Boolean,
    instalacion: {type: mongoose.Schema.ObjectId, ref:'instalacion'}
});

module.exports = mongoose.model('gastoscomunes', gastoscomunesSchema);