var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET home page. */
router.get('/', function(req, res, next) {
  models.noticiafavorita.findAll({
    attributes: {exclude: ["id"]}
  })
  .then(noticiaFav => {
    res.send(noticiaFav);
  })
  .catch(error => res.status(400).send(error));
});

router.post('/', function(req, res, next){
  const noticiafav= {
    idNoticia: req.body.idNoticia,
    correoUser: req.body.correoUser,
  };

 models.noticiafavorita.create(noticiafav)
 .then(noticiafav => {
    res.send(noticiafav)
  })
 .catch(error => res.status(500).send(error))
});

module.exports = router;
