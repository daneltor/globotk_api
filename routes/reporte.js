var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);
const {QueryTypes} = require('sequelize');


router.get('/users', function(req, res, next) {
    models.noticiafavorita.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('correoUser')),'correoUser']]
    })
    .then(noticiaFav => {
      res.send(noticiaFav);
    })
    .catch(error => res.status(400).send(error));
  });

router.get('/dates', function(req, res, next) {
    models.noticia.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('fechaActualizacion')),'fechaActualizacion']]
    })
    .then(noticiaFav => {
      res.send(noticiaFav);
    })
    .catch(error => res.status(400).send(error));
  });










module.exports = router;