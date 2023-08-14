//DATABASE CONNECTION
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const db = require("./dbInfo")

module.exports = async () => {

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbPassword,
  })
  await connection.query(`CREATE DATABASE IF NOT EXISTS iris;`)

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

  db.sequelize = sequelize
  db.Department = require("./Department")
  db.User = require("./User")
  db.Vehicle = require("./Vehicle")
  db.Sticker = require("./Sticker")
  db.Otp = require("./Otp")
}
