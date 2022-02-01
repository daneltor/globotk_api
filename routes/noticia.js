var express = require('express');
var router = express.Router();
const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);

/* GET home page. */
router.get('/', function(req, res, next) {
  models.noticia.findAll()
  .then(noticias => {
    res.send(noticias);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/:categoria', (req, res, next) => {
  let cat = req.params.categoria;
  if(cat=="musicnews"){
    cat="Music News";
  }
  models.noticia.findAll({
    where: {categoria: cat}
  })
  .then(musicn => {
    res.send(musicn);
  })
  .catch(error=> res.status())
})

router.post('/', function(req, res, next){
  const noticia= {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    ImagenAsociada: req.body.ImagenAsociada,
    fechaActualizacion: req.body.fechaActualizacion,
    categoria: req.body.categoria,
    rutaNoticia: req.body.rutaNoticia,
  };

 models.noticia.findOne(
    {where: {titulo: req.body.titulo}}
   ).then(noti => {
    
    if(noti==null){
        models.noticia.create(noticia)
        .then(noticia => {
          res.send(noticia)
        })
      .catch(error => res.status(500).send(error))
      
    }else{
      res.send({
        mensaje: `Noticia con título "${noti.titulo}" ya esta guardada en la base de datos`
      })
    }
  })
  .catch(error => res.status(500).send(error))
});

router.put('/', (req, res, next) => {
  const ide = req.body.id;

  const noticia= {
    id: req.body.id,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    ImagenAsociada: req.body.ImagenAsociada,
    fechaActualizacion: req.body.fechaActualizacion,
    categoria: req.body.categoria,
    rutaNoticia: req.body.rutaNoticia,
  };
  models.noticia.update(req.body, {
    where: { id: ide }
  })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Noticia was updated successfully."
       });
     } else {
       res.send({
         message: `Cannot update Noticia with id=${ide}. Maybe Noticia was not found or req.body is empty!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error updating Noticia with id=" + ide
     });
   });

});

router.delete('/', (req, res, next) => {
  const ide = req.body.id;

 models.noticia.destroy({
   where: { id: ide }
 })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Noticia was deleted successfully!"
       });
     } else {
       res.send({
         message: `Cannot delete Notica with id=${ide}. Maybe Noticia was not found!`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Could not delete Noticia with id=" + ide
     });
   });
});

module.exports = router;
