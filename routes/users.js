var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {QueryTypes} = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.usuario.findAll()
   .then(usuario => {
      res.send(usuario)
   })
   .catch(error => res.status(400).send(error))
});

router.get('/:idCorreo', function(req, res, next) {
  let idCorreo  = req.params.idCorreo;
  models.usuario.findByPk(idCorreo)
   .then(usuario => {
       if(usuario){
          res.send(usuario)
       }else{
         res.send('El usuario no existe')
       }
    })
   .catch(error => res.status(400).send(error))
});

router.post('/', (req, res, next) => {    
   // Create a client
   const custom = {
     Correo: req.body.email,
     Nombre: req.body.name, 
     Apellido: req.body.lastName,
     Contrasenia: req.body.password,
     celular: req.body.phone,
     fechaNacimiento: req.body.birthDate,
     isAdmin: false
   };
 
   // Save Tutorial in the database
   models.usuario.create(custom)
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the client."
       });
     });
});

module.exports = router;
