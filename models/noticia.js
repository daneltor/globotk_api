const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noticia', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    ImagenAsociada: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fechaActualizacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    categoria: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    rutaNoticia: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'noticia',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
