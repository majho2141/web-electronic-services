const moongose = require('mongoose');

const UsuarioSchema = moongose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: ['administrador', 'secretario','usuario'],
        default: 'usuario',
    },
    estado: {   
        type: Boolean,
        default: false,
    },
    fecha_creacion: {
        type: Date,
        default: Date.now(),
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = moongose.model('Usuario', UsuarioSchema);