const express = require("express")
const upload = require("../multer.js")
const {
  isUserAuthenticated,
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthenticated,
  isAuthorized,
} = require("../controllers/authentication")
const router = express.Router()
const {
  addVehicle,
  getVehicleById,
  getVehicleSticker,
  updateVehicle,
} = require("../controllers/vehicle")
const { getUserVehicle } = require("../controllers/user.js")

// Add new vehicle
router.post(
  "/",
  setUserAuthentication,
  isUserAuthenticated,
  upload.single("RCCopy"),
  addVehicle
)

router.get(
  "/:vehicleid",
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  getVehicleById
)

router.patch(
  "/:vehicleid",
  setUserAuthentication,
  isUserAuthenticated,
  upload.single("RCCopy"),
  updateVehicle
)

// GET USER VEHICLES
router.get(
  "/",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getUserVehicle
)

module.exports = router
