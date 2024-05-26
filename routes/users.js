const express = require('express');
const router = express.Router();
const users = require("../models/users");


router.post("/user", async function(req, res){
    let datos = req.body;
    //console.log(datos);
    let nuevoUser = new users(datos);
    await nuevoUser.save();
    res.send("Usuario creado correctamente");
});
// * --- BUSCAR USER--- * //
//localhost:5000/users/1234
router.get("/:id", async function(req, res){
    let userId = req.params.id;
    let searchUser = await users.findById(userId).select("-contraseña");
    console.log(searchUser);
    res.send(searchUser);
});
// * --- EDITAR USER --- * //
router.put("/:id", async function(){
    let userId = req.params.id;
    let nuevosDatos = req.body;
    let user = await users.findByIdAndUpdate(userId, nuevosDatos, { new: true }).select('-contraseña');
    res.send(user);
});
module.exports = router;
