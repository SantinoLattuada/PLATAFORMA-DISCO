const mongoose = require("mongoose");

let bd = mongoose 
.connect("mongodb+srv://lattuadasantino:Plataforma5@cluster0.kr4y6zj.mongodb.net/Proyecto_Final?retryWrites=true&w=majority&appName=Cluster0"
)
.then(function(db){
    //Que sudecede si la coneccion sale bien
    console.log(".... Conectado a MongoDB.....")
})
.catch(function(err){
    //Que sudecede si la conección sale mal
    console.log(err)
});

module.exports = bd;