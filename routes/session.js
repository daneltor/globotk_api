var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {QueryTypes} = require('sequelize');



/* GET home page. */
router.get('/:idCorreo', function(req, res, next) {
    models.sesion.findAll({
        limit: 1,
        where: {
            correoUser: req.params.idCorreo
        },
        order: [ [ 'id', 'DESC' ]]
      }).then(sesion => {
        res.send(sesion)
     })
     .catch(error => res.status(400).send(error)); 
});

router.post('/country', function(req, res, next) {
    const custom = {
        pais: req.body.pais,
		enlacePais: req.body.enlacePais,
		fecha: req.body.fecha,
		idSesion: req.body.idSesion
    };

    models.sesionpais.create(custom)
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