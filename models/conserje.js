const mongoose = require('mongoose');

const conserjeSchema = new mongoose.Schema({
    nombre: String,
    rut: Number,
    email: String
});

module.exports = mongoose.model('conserje', conserjeSchema);