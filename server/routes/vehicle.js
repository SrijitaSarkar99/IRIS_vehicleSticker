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
  updateVehicle,
  getVehicle,
} = require("../controllers/vehicle")
const { getUserVehicle } = require("../controllers/user.js")
const { body } = require("express-validator")

// Add new vehicle
router.post(
  "/",
  setUserAuthentication,
  isUserAuthenticated,
  upload.single("RCCopy"),
  body("VehicleNo").notEmpty().withMessage("Vehicle Number can't be empty"),
  body("VehicleType").notEmpty().withMessage("Vehicle Type can't be empty"),
  body("model").notEmpty().withMessage("Model can't be empty"),
  body("RCHName").notEmpty().withMessage("RC Holder name can't be empty"),
  body("relation")
    .notEmpty()
    .withMessage("Relation with RC Holder should be specified"),
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
  upload.single("rc_copy"),
  updateVehicle
)

// GET USER VEHICLES
router.get(
  "/",
  setUserAuthentication,
  setUserAuthorization,
  setServerAuthentication,
  isAuthorized,
  getVehicle
)

module.exports = router
