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

router.put('/country', (req, res, next) => {
  const ide = req.body.id;
  
  models.sesionpais.update(req.body, {
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

router.delete('/country', (req, res, next) => {
  const ide = req.body.id;

 models.sesionpais.destroy({
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