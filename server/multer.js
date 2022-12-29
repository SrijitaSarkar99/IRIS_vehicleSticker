const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (
        !fs.existsSync(path.join(__dirname, "public/files", file.fieldname))
      ) {
        fs.mkdirSync(path.join(__dirname, "public/files", file.fieldname), {
          recursive: true,
        })
      }
      cb(null, path.join(__dirname, "public/files", file.fieldname))
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + uuidv4() + "." + file.originalname.split(".")[1]
      )
    },
  }),
})
