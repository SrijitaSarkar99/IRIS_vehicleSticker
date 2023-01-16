const express = require("express")
const upload = require("../multer.js")
const { signUp, logIn, logOut } = require("../controllers/authentication")
const router = express.Router()

router.post(
  "/signup",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  signUp
)

router.post("/login", logIn)

router.get("/logout", logOut)

module.exports = router
