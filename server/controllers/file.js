const path = require("path")

exports.sendFile = (req, res) => {
  const folder = req.params.fileName.split("-")
  res
    .status(200)
    .sendFile(
      path.join(__dirname, "..", "public/files", folder[0], req.params.fileName)
    )
}
