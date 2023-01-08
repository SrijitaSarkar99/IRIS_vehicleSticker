const express = require("express")
const {
  setUserAuthentication,
  isUserAuthenticated,
  setServerAuthentication,
  isAuthenticated,
  isServerAuthenticated,
} = require("../controllers/authentication")
const {
  getSticker,
  addNewSticker,
  getStickerById,
  updateSticker,
} = require("../controllers/sticker")
const router = express.Router()

// Return stickers based on condition
router.get(
  "/",
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  getSticker
)

// Return sticker with a perticular id
router.get(
  "/:stickerid",
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  getStickerById
)

// Create a new sticker
router.post("/", setUserAuthentication, isUserAuthenticated, addNewSticker)

// Updates the status of the sticker
router.patch(
  "/:stickerid",
  setServerAuthentication,
  isServerAuthenticated,
  updateSticker
)

// // GET ALL STICKERS OF A VEHICLE
// router.get(
//   "/",
// setUserAuthentication,
// setServerAuthentication,
// isAuthenticated,
//   getVehicleSticker
// )

module.exports = router
