const express = require("express")
const { body } = require("express-validator")
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
router.get("/", getAllDepartment)

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
  body("dName").notEmpty().withMessage("Department Name can't be empty"),
  body("HODorHOS").notEmpty().withMessage("Submit the name if HOD or HOS"),
  addNewDepartment
)

// Update department info
router.patch(
  "/:departmentid",
  setServerAuthentication,
  isServerAuthenticated,
  updateDepartment
)

module.exports = router
