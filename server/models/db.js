//DATABASE CONNECTION
const { Sequelize } = require("sequelize")
const db = require("./dbInfo")

const sequelize = new Sequelize("iris", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Department = require("./department")
db.User = require("./user")
db.Vehicle = require("./vehicle")
db.Sticker = require("./sticker")
db.sequelize.sync()

sequelize
  .authenticate()
  .then(() => {
    console.log("Server connected to DB successfully")
  })
  .catch((error) => {
    console.log(`DB ERROR: ${error}`)
  })
