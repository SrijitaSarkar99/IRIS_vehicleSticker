//DATABASE CONNECTION
const { Sequelize } = require("sequelize")
const db = require("./dbInfo")

module.exports = async () => {
  const sequelize = new Sequelize("iris", "root", "", {
    host: "localhost",
    dialect: "mysql",
    password: process.env.dbPassword,
  })
  try {
    await sequelize.authenticate()
  } catch (error) {
    return console.log(`DB ERROR: ${error}`)
  }

  db.Sequelize = Sequelize
  db.sequelize = sequelize
  db.Department = require("./Department")
  db.User = require("./User")
  db.Vehicle = require("./Vehicle")
  db.Sticker = require("./Sticker")
  db.Otp = require("./Otp")
  db.sequelize.sync()
}
