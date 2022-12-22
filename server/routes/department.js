const express = require('express')
const { addNewDepartment } = require('../controllers/department')
const router = express.Router()

// Get all departments
router.get('/', () => {
  // TODO: Complete this function
})

// Get info about a perticular dept
router.get('/departmentid', () => {
  // TODO: Complete this function
})

// Add new department
router.post('/', addNewDepartment)

// Update department info
router.patch('/', () => {
  // TODO: Complete this function
})

router.get('/:departmentid/users', () => {
  // TODO: Implement this function
})

module.exports = router
