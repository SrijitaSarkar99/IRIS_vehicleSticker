const express = require("express")
const { setOtp, resetPassowrd } = require("../controllers/resetPassword")
const router = express.Router()

router.get("/", setOtp)

router.post("/", resetPassowrd)

module.exports = router
