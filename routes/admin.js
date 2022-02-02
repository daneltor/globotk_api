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

 router.put('/users', (req, res, next) => {
   const id = req.body.Correo;

   const custom = {
      Correo: req.body.Correo,
      Nombre: req.body.Nombre, 
      Apellido: req.body.Apellido,
      Contrasenia: req.body.Contrasenia,
      celular: req.body.celular,
      fechaNacimiento: req.body.fechaNacimiento,
      isAdmin: req.body.isAdmin
    };
 
   models.usuario.update(custom, {
     where: { Correo: id }
   })
     .then(num => {
       if (num == 1) {
         res.send({
           message: "User was updated successfully."
         });
       } else {
         res.send({
           message: `Cannot update user with correo=${id}. Maybe user was not found or req.body is empty!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating user with correo=" + id
       });
     });
 
 });

router.post('/users', (req, res, next) => {    
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
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the user."
       });
     });

});


router.get('/tablaPaises', function (req, res, next) {
   sequelize.query("SELECT pais as company,count(*) as frequency FROM sesionpais group by pais;", {
   type: QueryTypes.SELECT
   })
   .then(paises => {
      res.send(paises)
   })
   .catch(error => res.status(400).send(error))
});

router.get('/tablaSesiones', function (req, res, next) {
   sequelize.query("SELECT date, count(*) as value FROM (SELECT SUBSTRING(fecha, 1, 10) AS date FROM sesion) t group by date order by date DESC limit 7;", {
   type: QueryTypes.SELECT
   })
   .then(sesiones => {
      res.send(sesiones)
   })
   .catch(error => res.status(400).send(error))
});

router.get('/tablaCategorias', function (req, res, next) {
   sequelize.query("SELECT categoria as company,count(*) as frequency FROM noticia group by categoria;", {
   type: QueryTypes.SELECT
   })
   .then(noticias => {
      res.send(noticias)
   })
   .catch(error => res.status(400).send(error))
});

module.exports = router;
