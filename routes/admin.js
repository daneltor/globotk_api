var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {QueryTypes} = require('sequelize');


router.delete('/users', (req, res, next) => {
    const id = req.body.Correo;
 
   models.usuario.destroy({
     where: { Correo: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Client was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete client with id=${id}. Maybe client was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete client with id=" + id
       });
     });
 });

 router.put('/clientes', (req, res, next) => {
    const id = req.body.id;
 
   models.clientes.update(req.body, {
     where: { id: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "Client was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update client with id=${id}. Maybe client was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating client with id=" + id
       });
     });
 
 });

router.post('/', (req, res, next) => {    
   // Create a client
   const custom = {
     Correo: req.body.Correo,
     Nombre: req.body.Nombre, 
     Apellido: req.body.Apellido,
     Contrasenia: req.body.Contrasenia,
     celular: req.body.celular,
     fechaNacimiento: req.body.fechaNacimiento,
     isAdmin: req.body.isAdmin
   };
 
   // Save Tutorial in the database
   models.usuario.create(custom)
     .then(data => {
       res.send(data);
       res.redirect('http://localhost:4200/admUsers');
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the client."
       });
     });
 
 

});

module.exports = router;
