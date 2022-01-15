const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sesionpais', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pais: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    enlacePais: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idSesion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sesionpais',
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
      {
        name: "idSesion",
        using: "BTREE",
        fields: [
          { name: "idSesion" },
        ]
      },
    ]
  });
};
