require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const initializeDB = require("./models/db")

// Enables CORS
// const cors = require('cors');
// app.use(cors({ origin: true }))
// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === "http://localhost:3000" || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function projSetUp() {
  // DB INITIALIZATION
  await initializeDB()

  // Importing Routes
  const user = require("./routes/user")
  const vehicle = require("./routes/vehicle")
  const sticker = require("./routes/sticker")
  const department = require("./routes/department")
  const file = require("./routes/file")
  // Routes setup
  app.use("/", user)
  app.use("/vehicles", vehicle)
  app.use("/stickers", sticker)
  app.use("/departments", department)
  app.use("/files", file)
}

projSetUp()

app.listen("5000", () => {
  console.log("Server is listening at port 5000")
})
