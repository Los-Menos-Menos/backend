const mongoose = require('mongoose');

const directivaSchema = new mongoose.Schema({
    nombre: String,
    rut: Number,
    email: String
});

module.exports = mongoose.model('directiva', directivaSchema);