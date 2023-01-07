const express = require("express")
const {
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  isServerAuthenticated,
  isUserAuthenticated,
} = require("../controllers/authentication")
const {
  addNewDepartment,
  getAllDepartment,
  getDepartmentById,
  getDepartmentUsers,
  updateDepartment,
} = require("../controllers/department")
const router = express.Router()

// Get all departments
router.get(
  "/",
  setUserAuthentication,
  setServerAuthentication,
  isAuthenticated,
  getAllDepartment
)

// Get info about a perticular dept
router.get(
  "/:departmentid",
  setServerAuthentication,
  isServerAuthenticated,
  getDepartmentById
)

// Add new department
router.post(
  "/",
  setServerAuthentication,
  isServerAuthenticated,
  addNewDepartment
)

// Update department info
router.patch(
  "/:departmentid",
  setServerAuthentication,
  isServerAuthenticated,
  updateDepartment
)

// router.get(
//   "/:departmentid/user",
//   setServerAuthentication,
//   isServerAuthenticated,
//   getDepartmentUsers
// )

module.exports = router
