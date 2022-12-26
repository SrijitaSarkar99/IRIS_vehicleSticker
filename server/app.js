require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()

// DB INITIALIZATION
require("./models/db")

//Middlewares
//TODO: Add cors configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === "localhost:3000" || !origin) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

// Importing Routes
const user = require("./routes/user")
const vehicle = require("./routes/vehicle")
const sticker = require("./routes/sticker")
const department = require("./routes/department")

// Routes setup
app.use("/", user)
app.use("/vehicle", vehicle)
app.use("/sticker", sticker)
app.use("/department", department)

app.listen("5000", () => {
  console.log("Server is listening at port 5000")
})
