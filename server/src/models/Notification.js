const { DataTypes } = require("sequelize");
const { TASK_NOTIFICATION_TYPES } = require("../../global_constants");

module.exports = (sequelize) => {
    sequelize.define(
        "notification",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: DataTypes.ENUM(TASK_NOTIFICATION_TYPES),
                allowNull: false,
            },
            seen: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue:false
            },
        },
        { timestamps: true }
    )
}