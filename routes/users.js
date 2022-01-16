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

router.post('/validate', function(req, res, next){
  let cliente = req.body.user;
  let contrasenia = req.body.password;
  models.usuario.findOne({
    where: {
      Correo: cliente,
      Contrasenia: contrasenia
    }
  })
   .then(usuario => {
       if(usuario){
         res.cookie('usuario',cliente , {expire : new Date() + 9999});
         var today = new Date();
         var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
         var dateTime = date+' '+time;
         
         const custom = {
           fecha: dateTime,
           correoUser: req.body.user, 
          }; 
          models.sesion.create(custom);
          
          res.redirect('http://localhost:4200/home');
       }else{
         res.cookie('usuario', '', {expires: new Date(0)});
         res.redirect('http://localhost:4200/');
       }
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
       res.redirect('http://localhost:4200/register');
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while creating the client."
       });
     });
 
 

});

module.exports = router;
