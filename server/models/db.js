//DATABASE CONNECTION
const { Sequelize } = require("sequelize")
const db = require("./dbInfo")

module.exports = async () => {
  const sequelize = new Sequelize("iris", "root", "", {
    host: "localhost",
    dialect: "mysql",
    password: process.env.DBPASSWORD,
    pool: {
      max: 200,
      min: 0,
      acquire: 60000,
      idle: 30000
    }
  })
  try {
    await sequelize.authenticate()
  } catch (error) {
    return console.log(`DB ERROR: ${error}`)
  }

  // db.Sequelize = Sequelize
  db.sequelize = sequelize
  db.Department = require("./Department")
  db.User = require("./User")
  db.Vehicle = require("./Vehicle")
  db.Sticker = require("./Sticker")
  db.Otp = require("./Otp")
}
