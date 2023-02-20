const { DataTypes } = require("sequelize")
const { sequelize } = require("./dbInfo")
const { User } = require("./dbInfo")

const Vehicle = sequelize.define("Vehicle", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    VehicleNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    VehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    RCHName: {
        // Registration Certificate Holder Name
        type: DataTypes.STRING,
        allowNull: false,
    },
    relation: {
        // Relationship with the RCH Holder
        type: DataTypes.STRING,
        allowNull: false,
    },
    RCCopy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "userId",
        },
        allowNull: false,
    },
})

Vehicle.sync()

module.exports = Vehicle