const express = require("express")
const upload = require("../multer.js")
const {
  isUserAuthenticated,
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
} = require("../controllers/authentication")
const router = express.Router()
const {
  addVehicle,
  getVehicleById,
  getVehicleSticker,
  updateVehicle,
} = require("../controllers/vehicle")

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
  updateVehicle
)

router.get(
  "/:vehicleid/sticker",
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  getVehicleSticker
)

module.exports = router
