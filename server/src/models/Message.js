const { DataTypes } = require("sequelize");
//const { AREA, DIFFICULTY, STATUS,HOWLONG,PURPOSE } = require('../../global_constants');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "message",
    {
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("enviado", "recibido"),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
