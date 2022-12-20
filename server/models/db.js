//DATABASE CONNECTION
const { Sequelize } = require('sequelize')
const db = require('./dbInfo')

const sequelize = new Sequelize('iris', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(() => {
    db.Sequelize = Sequelize
    db.sequelize = sequelize
    db.Department = require('./Department')
    db.User = require('./User')
    db.Vehicle = require('./Vehicle')
    db.Sticker = require('./Sticker')
    db.sequelize.sync()
  })
  .catch((error) => {
    console.log(`DB ERROR: ${error}`)
  })
