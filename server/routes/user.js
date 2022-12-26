const express = require("express")
const upload = require("../multer.js")
const {
  signUp,
  logIn,
  logOut,
  setUserAuthentication,
  setServerAuthentication,
  setUserAuthorization,
  isAuthorized,
} = require("../controllers/authentication")
const {
  getUserById,
  getUserVehicle,
  updateUser,
} = require("../controllers/user")
const router = express.Router()

//  ... AUTHENTICATION APIS ...
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
// ... AUTHENTICATION APIS END HERE ...

router.get(
  "/user/:userid",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getUserById
)

// TODO: Add authorization here
router.patch(
  "/user/:userid",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  updateUser
)

router.get(
  "/user/:userid/vehicle",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getUserVehicle
)

module.exports = router
