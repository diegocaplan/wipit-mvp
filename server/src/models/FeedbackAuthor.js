const { DataTypes, default: sequelize } = require("sequelize");
const OPINIONS = ["1", "2", "3", "4", "5"];

module.exports = (sequelize) => {
  sequelize.define(
    "feedbackAuthor",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
      },
      taskcomplete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        // unique: true,
      },
      useropinion: {
        type: DataTypes.ENUM(OPINIONS),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
