const { DataTypes } = require("sequelize");
const {
  AREA,
  DIFFICULTY,
  STATUS,
  HOWLONG,
  PURPOSE,
} = require("../../global_constants");

module.exports = (sequelize) => {
  sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      copyOriginalID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(STATUS),
        allowNull: false,
      },
      purpose: {
        type: DataTypes.ENUM(PURPOSE),
        allowNull: false,
      },
      area: {
        type: DataTypes.ENUM(AREA),
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM(DIFFICULTY),
        allowNull: false,
      },
      howlong: {
        type: DataTypes.ENUM(HOWLONG),
        allowNull: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      otherLang: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // FORMS REVIEWS

      taskComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      assignedReview: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      authorLanguageReview: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorPurposeReview: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorAreaReview: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorTimeReview: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      authorDifficultyReview: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
