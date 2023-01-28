const { DataTypes } = require("sequelize")
const { sequelize } = require("./dbInfo")
const User = require("./User")

const Otp = sequelize.define("Otp", {
  id: {
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
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validity: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

module.exports = Otp
