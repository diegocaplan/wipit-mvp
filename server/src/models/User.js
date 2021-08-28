const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      cv: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      webPage: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      behance: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allownull: true,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM(["user", "admin"]),
        allownull: true,
        defaultValue: "user",
      },
      image: {
        type: DataTypes.TEXT,
        allownull: true,
        defaultValue: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
      },
    },
    { timestamps: true }
  );
};
