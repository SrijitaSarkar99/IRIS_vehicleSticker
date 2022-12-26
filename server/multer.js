const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
module.exports = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/files/")
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + uuidv4() + "." + file.originalname.split(".")[1]
      )
    },
  }),
})
