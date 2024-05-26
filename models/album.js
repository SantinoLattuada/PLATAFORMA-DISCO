let mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cancion = new Schema({
    numCancion: Number,
    titulo: String,
    duracion: String,
    artista: String,
    youtubeLink: String
});

let album = new Schema({
    titulo: {
        type: String,
        requerid: true,
    },
    descripcion: {
        type: String,
        requerid: true,
        minLenght: 5,
        maxLenght: 200,
    },
    anio: {
        type: Number,
        requerid: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: 'El año de lanzamiento debe ser mayor a cero.'
        }
    },
    canciones: {
        type: [cancion],
        default: []
    },
    portada: String,
});

module.exports = mongoose.model("albums", album);