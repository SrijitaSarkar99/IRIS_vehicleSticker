const path = require("path")

exports.sendFile = (req, res) => {
    console.log(req);
    const folder = req.params.fileName.split("-")
    console.log(path.join(__dirname, "..", "public/files", folder[0], req.params.fileName));
    res
        .status(200)
        .sendFile(
            path.join(__dirname, "..", "public/files", folder[0], req.params.fileName)
        )
}