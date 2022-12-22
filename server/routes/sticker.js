const express = require('express')
const router = express.Router()

// Return stickers based on condition
router.get('/', (req, res) => {
  // TODO: Implement the function
  // This route expect a query param "evaluationBy"
  // if evaluationBy is defined then return stickers accounding to it
  // else return all stickers
  res.json(req.query)
})

// Return sticker with a perticular id
router.get('/:stickerid', () => {
  // TODO: Implement the function
})

// Create a new sticker
router.post('/', () => {
  // TODO: Implement the function
})

// Updates the status of the sticker
router.patch('/:stickerid', () => {
  // TODO: Implement this function
})

module.exports = router
