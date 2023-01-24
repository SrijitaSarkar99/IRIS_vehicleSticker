const express = require("express")
const {
    setUserAuthentication,
    isUserAuthenticated,
    setServerAuthentication,
    isAuthenticated,
    isServerAuthenticated,
} = require("../controllers/authentication")
const {
    addNewSticker,
    getStickerById,
    updateSticker,
    getSticker,
} = require("../controllers/sticker")
const router = express.Router()

// Return stickers based on condition or vehicle_id or user_id
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

module.exports = router