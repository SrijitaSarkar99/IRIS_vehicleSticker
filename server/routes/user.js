const express = require("express")
const upload = require("../multer.js")
const {
    setUserAuthentication,
    setServerAuthentication,
    isServerAuthenticated,
    setUserAuthorization,
    isAuthorized,
} = require("../controllers/authentication")
const { getUserById, updateUser } = require("../controllers/user")
const { getDepartmentUsers } = require("../controllers/department.js")
const router = express.Router()

router.get(
    "/:id",
    setUserAuthentication,
    setUserAuthorization,
    setServerAuthentication,
    isAuthorized,
    getUserById
)

router.patch(
    "/:id",
    setUserAuthentication,
    setUserAuthorization,
    setServerAuthentication,
    isAuthorized,
    upload.fields([
        { name: "photo", maxCount: 1 },
        { name: "idProof", maxCount: 1 },
    ]),
    updateUser
)

router.get(
    "/",
    setServerAuthentication,
    isServerAuthenticated,
    getDepartmentUsers
)

module.exports = router