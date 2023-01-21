const express = require("express")
const {
    setServerAuthentication,
    isServerAuthenticated,
} = require("../controllers/authentication")
const {
    addNewDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
} = require("../controllers/department")
const router = express.Router()

// Get all departments
router.get("/", getAllDepartments)

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

module.exports = router