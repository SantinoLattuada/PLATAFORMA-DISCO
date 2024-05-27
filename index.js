const express = require("express");
let app = express();
const PORT = 5000;
const mongoose = require("./conexion");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
//app.use(bodyParser.urlencoded({extended: true}));
// Middleware para parsear JSON y datos URL-encoded
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//Importar las rutas
const usersRouter = require('./routes/users');
const albumsRouter = require('./routes/album');

app.use(express.static(path.join(__dirname, "FRONT")));

// Usar las rutas
app.use("/users", usersRouter);
app.use("/albums", albumsRouter);//localhost:5000/albums/band


//Inicio servidor en puerto 5000
app.listen(PORT, function(){
    console.log("********************************");
    console.log("SERVIDOR INICIADO EN PUERTO 5000");
    console.log("********************************");
});