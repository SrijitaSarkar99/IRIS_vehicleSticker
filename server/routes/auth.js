const express = require("express")
const upload = require("../multer.js")
const { signUp, logIn, logOut } = require("../controllers/authentication")
const { body } = require("express-validator")
const router = express.Router()

router.post(
  "/signup",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
  ]),
  body("email")
    .notEmpty()
    .withMessage("Email can't be empty")
    .isEmail()
    .withMessage("Not a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 8 })
    .withMessage("Password must of at least 8 char"),
  body("aadharNumber")
    .notEmpty()
    .withMessage("Aadhar Number can't be empty")
    .isLength({ min: 12, max: 12 })
    .withMessage("Aadhar Number must of 10 char"),
  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile Number can't be empty")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile Number must of 10 char"),
  body("name").notEmpty().withMessage("Name can't be empty"),
  body("department").notEmpty().withMessage("Department can't be empty"),
  body("pinCode").notEmpty().withMessage("Pin Code can't be empty"),
  body("country").notEmpty().withMessage("country can't be empty"),
  body("gender").notEmpty().withMessage("Gender can't be empty"),
  body("type").notEmpty().withMessage("User Type can't be empty"),

  signUp
)

router.post("/login", logIn)

router.get("/logout", logOut)

module.exports = router
