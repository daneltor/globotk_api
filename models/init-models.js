var DataTypes = require("sequelize").DataTypes;
var _noticia = require("./noticia");
var _noticiafavorita = require("./noticiafavorita");
var _sesion = require("./sesion");
var _sesionpais = require("./sesionpais");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var noticia = _noticia(sequelize, DataTypes);
  var noticiafavorita = _noticiafavorita(sequelize, DataTypes);
  var sesion = _sesion(sequelize, DataTypes);
  var sesionpais = _sesionpais(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);


  return {
    noticia,
    noticiafavorita,
    sesion,
    sesionpais,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
