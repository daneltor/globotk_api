const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    Correo: {
      type: DataTypes.CHAR(33),
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    Apellido: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    Contrasenia: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    celular: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Correo" },
        ]
      },
    ]
  });
};
