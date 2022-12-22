const express = require('express')
const router = express.Router()

// Add new vehicle
router.post('/', () => {
  // TODO: Implement the function
})

router.get('/:vehicleid', (req, res) => {
  // TODO: Implement the function
  res.json({ msg: 'Working' })
})

router.patch('/:vehicleid', () => {
  // TODO: Implement the function
})

// TODO: Can be shifted to other router file
router.get('/:vehicleid/sticker', () => {
  //TODO: Implement the function
})

module.exports = router
