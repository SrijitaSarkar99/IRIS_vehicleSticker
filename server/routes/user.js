const express = require('express')
const { signUp } = require('../controllers/authentication')
const router = express.Router()

//  ... AUTHENTICATION APIS ...
//TODO: Implement this route
router.post('/signup', signUp)

router.post('/login', (req, res) => {
  //TODO: Implement This route
})

router.get('/logout', () => {
  // TODO: Implement this function
})
// ... AUTHENTICATION APIS END HERE ...

router.get('/user/:userid', () => {
  // TODO: Implement this function
})

router.patch('/user/:userid', () => {
  // TODO: Implement this function
  // Here user can update his/her profile info expect status property
  // which can only be updated by HOD/HOS through IRIS
})

// TODO: Can be shifted to other route file
router.get('/user/:userid/vehicle', () => {
  // TODO: Implement the function
})

module.exports = router
