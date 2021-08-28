const { DataTypes } = require('sequelize');
const { AREA } = require('../../global_constants');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('language', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    area: {
      type: DataTypes.ENUM(AREA),
      allownull: false,
    }
  }, { timestamps: false });
};