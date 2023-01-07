const express = require("express")
const upload = require("../multer.js")
const {
  signUp,
  logIn,
  logOut,
  setUserAuthentication,
  setServerAuthentication,
  isServerAuthenticated,
  setUserAuthorization,
  isAuthorized,
} = require("../controllers/authentication")
const {
  getUserById,
  getUserVehicle,
  updateUser,
} = require("../controllers/user")
const { getDepartmentUsers } = require("../controllers/department.js")
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
  "/users/:id",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getUserById
)

router.patch(
  "/users/:id",
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
  "/users/:id/vehicles",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getUserVehicle
)

router.get(
  "/users",
  setServerAuthentication,
  isServerAuthenticated,
  getDepartmentUsers
)

module.exports = router
