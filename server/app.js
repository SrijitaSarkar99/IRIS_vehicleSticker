require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const initializeDB = require("./models/db")

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
  const auth = require("./routes/auth")
  const user = require("./routes/user")
  const vehicle = require("./routes/vehicle")
  const sticker = require("./routes/sticker")
  const department = require("./routes/department")
  const file = require("./routes/file")
  const resetPassword = require("./routes/resetPassword")
  // Routes setup
  app.use("/", auth)
  app.use("/users", user)
  app.use("/vehicles", vehicle)
  app.use("/stickers", sticker)
  app.use("/departments", department)
  app.use("/files", file)
  app.use("/resetPassword", resetPassword)
}

projSetUp()

app.listen("5000", () => {
  console.log("Server is listening at port 5000")
})
