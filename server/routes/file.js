const express = require("express")
const {
    setUserAuthentication,
    setServerAuthentication,
    isAuthorized,
    isAuthenticated,
} = require("../controllers/authentication")
const { sendFile } = require("../controllers/file")
const router = express()

router.get(
    "/:fileName",
    setUserAuthentication,
    setServerAuthentication,
    isAuthenticated,
    sendFile
)

module.exports = router