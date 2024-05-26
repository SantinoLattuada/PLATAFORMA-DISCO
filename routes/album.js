const express = require('express');
const router = express.Router();
const album = require("../models/album");

// * --- CREATE ALBUM --- * //
router.post("/band", async function(req, res){
    let datos = req.body;
    if (!datos.canciones) {
        datos.canciones = [];
    }
    let nuevoAlbum = new album(datos);
    await nuevoAlbum.save();
    res.status(201).json({ id: nuevoAlbum._id }); //Devuelvo el ID del album nuevo
});
// * --- EDITAR ALBUM --- * //
router.put("/band/:id", async function(req, res){
    let albumId = req.params.id;
    let nuevosDatos = req.body;
    let updatedAlbum = await album.findByIdAndUpdate(albumId, nuevosDatos, { new: true });
    res.send(updatedAlbum);
});
// * --- CREAR UNA CANCION DEL ALBUM --- * //
router.put("/band/:id/canciones", async function(req, res){
    //console.log("¿esta entrando?");
    let disco = album.findById(req.params.id);

    const nuevaCancion = {
        titulo: req.body.titulo,
        duracion: req.body.duracion,
        youtubeLink: req.body.youtubeLink
    };
    const updatedAlbum = await album.findByIdAndUpdate(req.params.id,{ $push: { canciones: nuevaCancion } });
    res.send("Cancion agregada al álbum");
});
// * --- ELIMINAR UNA CANCION DEL ALBUM --- * //
router.put("/band/:id", async function(req, res){
    const { id } = req.params;
    const updatedAlbumData = req.body;
    const updatedAlbum = await album.findByIdAndUpdate(id, { canciones: updatedAlbumData.canciones }, { new: true });
    console.log("Album Actualizado: ", updatedAlbum);
    res.send("Canción eliminada del álbum");
});
// * --- VER TODOS LOS ALBUMS --- * //
router.get("/band", async function(req, res){
    //console.log("cualquier texto");
    let documento2 = await album.find();
    res.send(documento2);
});
// * --- VER ALBUM EN ESPECIFICO --- * //
router.get('/band/:id', async function(req, res){
    let albumId = req.params.id;
    let documento3 = await album.findById(albumId);
    res.send(documento3);
});
// * --- ELIMINAR ALBUM --- * //
router.delete("/band/:id", async function(req, res){
    let id_operacion = req.params.id;
    await album.findByIdAndDelete(id_operacion);
    res.send("Operacion eliminada con exito");
});

module.exports = router;