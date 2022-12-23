const { DataTypes } = require('sequelize')
const { sequelize } = require('./dbInfo')
const Department = require('./department')

const User = sequelize.define('User', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aadharNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department: {
    type: DataTypes.STRING,
    references: {
      model: Department,
      key: 'dName',
    },
    allowNull: false,
  },
  addressLine1: DataTypes.STRING,
  addressLine2: DataTypes.STRING,
  city: DataTypes.STRING, // Address part can be modified ...
  state: DataTypes.STRING,
  pinCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idProof: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'gemale'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('unverified', 'verified', 'denied'),
    defaultValue: 'unverified',
  },
  type: {
    type: DataTypes.ENUM('Student', 'Faculty', 'Non academic staff'),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = User
