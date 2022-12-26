//DATABASE CONNECTION
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const db = require("./dbInfo")

module.exports = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
  })
  await connection.query(`CREATE DATABASE IF NOT EXISTS iris;`)
  const sequelize = new Sequelize("iris", "root", "", {
    host: "localhost",
    dialect: "mysql",
  })
  try {
    await sequelize.authenticate()
  } catch (error) {
    return console.log(`DB ERROR: ${error}`)
  }

  db.Sequelize = Sequelize
  db.sequelize = sequelize
  db.Department = require("./department")
  db.User = require("./user")
  db.Vehicle = require("./vehicle")
  db.Sticker = require("./sticker")
  db.sequelize.sync()
}
