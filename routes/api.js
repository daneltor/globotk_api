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
