const mongoose = require('mongoose');

const libroreservasSchema = new mongoose.Schema({
    reservas: [{type: mongoose.Schema.ObjectId, ref:'reserva'}]
});

module.exports = mongoose.model('libroreservas', libroreservasSchema);