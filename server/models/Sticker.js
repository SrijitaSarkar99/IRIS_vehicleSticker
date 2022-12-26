const { DataTypes } = require("sequelize")
const { sequelize } = require("./dbInfo")
const { User, Vehicle, Department } = require("./dbInfo")

const Sticker = sequelize.define("Sticker", {
  sid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "userId",
    },
    allowNull: false,
  },
  VehicleId: {
    type: DataTypes.UUID,
    references: {
      model: Vehicle,
      key: "id",
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  validity: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM([
      "unapproved",
      "approved by FIC",
      "denied by FIC",
      "approved by CSO",
      "denied by CSO",
    ]),
    defaultValue: "unapproved",
  },
  dName: {
    type: DataTypes.STRING,
    references: {
      model: Department,
      key: "dName",
    },
    allowNull: false,
  },
  reason: {
    // Reason for which sticker is not issued, in case sticker is not issued
    type: DataTypes.TEXT,
  },
})

module.exports = Sticker
