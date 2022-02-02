var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {QueryTypes} = require('sequelize');
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sesiones', function(req, res, next) {
  models.sesion.findAll()
   .then(sesion => {
      res.send(sesion)
   })
   .catch(error => res.status(400).send(error))
});

router.get('/cosesiones', function(req, res, next) {
  models.sesionpais.findAll()
   .then(sesionpais => {
      res.send(sesionpais)
   })
   .catch(error => res.status(400).send(error))
});

router.delete('/sesiones', (req, res, next) => {
  const ide = req.body.id;

 models.sesion.destroy({
   where: { id: ide }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Sesion was deleted successfully!"
       });
     } else {
       res.send({
         message: `Cannot delete Sesion with id=${ide}. Maybe Sesion was not found!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Could not delete Sesion with id=" + ide
     });
   });
});


router.put('/sesiones', (req, res, next) => {
  const ide = req.body.id;
  
  models.sesion.update(req.body, {
    where: { id: ide }
  })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Sesion was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update Sesion with id=${ide}. Maybe Sesion was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Sesion with id=" + ide
     });
   });

});

router.get('/sesiones/:idSesion', function(req, res, next) {
  let idSesion  = req.params.idSesion;
  models.sesion.findByPk(idSesion)
   .then(sesion => {
       if(sesion){
          res.send(sesion)
       }else{
         res.send('La sesion no existe')
       }
    })
   .catch(error => res.status(400).send(error))
});

router.post("/sendmail", (req, res) => {
   console.log("request came");
   let user = req.body;
   transporter.sendMail(user, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
   });
});

var transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
     auth: {
       user: "globotecarios@gmail.com",
       pass: "zurgbtdgmwwujslz"
     }
   });
 
 

module.exports = router;
