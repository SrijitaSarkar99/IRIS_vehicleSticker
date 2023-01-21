const { DataTypes } = require('sequelize')
const { sequelize } = require('./dbInfo')

const Department = sequelize.define('Department', {
    did: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    dName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    HODorHOS: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iris_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Department