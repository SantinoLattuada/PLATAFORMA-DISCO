let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let usuarios = new Schema({
    nombre: {
        type: String,
        required: true,
        minLenght: 2,
    },
    apellido: {
        type: String,
        required: true,
        minLenght: 2,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return regex.test(v);
            },
            message: 'Debes ingresar un email válido!'
        }
    },
    contrasenia: {
        type: String,
        required: true,
    },
    favoritos: String,
});

module.exports = mongoose.model("users", usuarios);