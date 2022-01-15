const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noticiafavorita', {
    idNoticia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    correoUser: {
      type: DataTypes.CHAR(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'noticiafavorita',
    timestamps: false,
    indexes: [
      {
        name: "idNoticia",
        using: "BTREE",
        fields: [
          { name: "idNoticia" },
        ]
      },
      {
        name: "correoUser",
        using: "BTREE",
        fields: [
          { name: "correoUser" },
        ]
      },
    ]
  });
};
