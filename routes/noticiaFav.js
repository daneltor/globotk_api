var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET home page. */
router.get('/', function(req, res, next) {
  models.noticiafavorita.findAll({
    include: {model: models.noticia, as: "noticia", attributes: ["titulo","fechaActualizacion","categoria"]},
    //attributes: {exclude: ["id"]}
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

  models.noticiafavorita.findOne(
    {where: {idNoticia: req.body.idNoticia , correoUser: req.body.correoUser},
    include: {model: models.noticia, as: "noticia", attributes: ["titulo"]},
  }
   ).then(notif => {
    
    if(notif==null){
      models.noticiafavorita.create(noticiafav)
      .then(noticiafav => {
          res.send(noticiafav)
        })
      .catch(error => res.status(500).send(error))
      
    }else{
      res.send({
        mensaje: `NoticiaFavorita con titulo '${notif.noticia.titulo}' de usuario '${notif.correoUser}' ya esta guardada en la base de datos`
      })
    }
  })
  .catch(error => res.status(500).send(error))
    
});
/*
router.put('/', (req, res, next) => {
  const ide = req.body.idNoticia;
  const correo = req.body.correoUser;
 models.noticia.update(req.body, {
   where: { idNoticia: ide, correoUser: correo  }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "NoticiaFav was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update NoticiaFav with id=${ide}. Maybe NoticiaFav was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating NoticiaFav with id=" + ide
     });
   });

});
*/
router.delete('/', (req, res, next) => {
  const ide = req.body.idNoticia;
  const correo = req.body.correoUser;
 models.noticiafavorita.destroy({
   where: { idNoticia: ide, correoUser: correo  }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "NoticiaFav was deleted successfully!"
       });
     } else {
       res.send({
         message: `Cannot delete NoticiaFav with id=${ide}. Maybe NoticiaFav was not found!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Could not delete NoticiaFav with id=" + ide
     });
   });
});

module.exports = router;
