const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/dbInfo")
const { validationResult } = require("express-validator")
const path = require("path")
const fs = require("fs")

const deleteFile = (url, prop) => {
  const pathArr = url.split("/")
  let filePath = path.join(
    __dirname,
    "../public/files",
    prop,
    pathArr[pathArr.length - 1]
  )
  console.log(filePath)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

exports.signUp = async (req, res) => {
  // TODO: Implement the function

  // return res.json(req.files)

  const result = validationResult(req)
  const hasErrors = !result.isEmpty()

  if (hasErrors) {
    for (file in req.files)
      deleteFile(req.files[file][0].filename, req.files[file][0].fieldname)
    return res.status(400).json(result)
  }

  if (!req.files || Object.keys(req.files).length < 2) {
    for (file in req.files)
      deleteFile(req.files[file][0].filename, req.files[file][0].fieldname)
    return res
      .status(400)
      .json({ msg: "One or more required file is not sent" })
  }

  for (file in req.files) {
    req.body[
      file
    ] = `http://localhost:5000/files/${req.files[file][0].filename}`
  }

  const user = User.build(req.body)
  try {
    user.password = await bcrypt.hash(user.password, 10)
    user.email = user.email.toLowerCase()
    const resp = await user.save()
    res.status(201).json({
      id: resp.userId,
      email: resp.email,
      name: resp.name,
      aadhar_number: resp.aadharNumber,
      mobile_number: resp.mobileNumber,
      department: resp.department,
      address_line1: resp.addressLine1,
      address_line2: resp.addressLine2,
      city: resp.city,
      state: resp.state,
      pin_code: resp.pinCode,
      country: resp.country,
      photo: resp.photo,
      id_proof: resp.idProof,
      gender: resp.gender,
      status: resp.status,
      type: resp.type,
      reason: resp.reason,
      iris_id: resp.iris_id,
    })
  } catch (error) {
    for (file in req.files)
      deleteFile(req.files[file][0].filename, req.files[file][0].fieldname)
    res.status(500).json({ err: error })
  }
}

exports.logIn = async (req, res) => {
  let { email, password } = req.body
  email = email.toLowerCase()
  let user
  try {
    user = await User.findOne({
      attributes: ["userId", "name", "email", "password"],
      where: { email: email },
    })
    if (!user) {
      return res.status(404).json({ msg: "Invalid User" })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ msg: "Wrong Password" })
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }

  // JWT SETUP
  jwt.sign(
    { userId: user.userId, name: user.name, email: user.email },
    process.env.privateUserKey,
    function (err, token) {
      if (err) {
        return res.status(500).json({ err })
      }
      return res.status(200).json({
        user: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        token,
      })
    }
  )
}

exports.logOut = (req, res) => {
  // In JWT logOut feature is implemented on frontend
  res.json({ msg: "Logged Out" })
}

exports.setUserAuthentication = (req, res, next) => {
  let token = ""
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.privateUserKey, (err, decoded) => {
      if (err) {
        req.user = false
        return next()
      }
      req.user = decoded
      next()
    })
  } else {
    req.user = false
    next()
  }
}

exports.setServerAuthentication = (req, res, next) => {
  if (req.user) {
    req.server = false
    next()
    return
  }
  let token = ""
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1]

    jwt.verify(token, process.env.privateServerKey, (err, decoded) => {
      if (err || decoded != process.env.serverPayload) {
        req.server = false
        return next()
      }
      req.server = true
      next()
    })
  } else {
    req.server = false
    next()
  }
}

exports.setUserAuthorization = (req, res, next) => {
  req.authorized =
    req.user.userId === req.params.id || req.user.userId === req.query.user_id
  next()
}

exports.isUserAuthenticated = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: "Not authenticated" })
  next()
}

exports.isServerAuthenticated = (req, res, next) => {
  if (!req.server) return res.status(401).json({ msg: "Not authenticated" })
  next()
}

exports.isUserAuthorized = (req, res, next) => {
  if (!req.authorized) return res.status(401).json({ msg: "Not authorized" })
  next()
}

exports.isAuthenticated = (req, res, next) => {
  if (!req.user && !req.server)
    return res.status(401).json({ msg: "Not authenticated" })
  next()
}

exports.isAuthorized = (req, res, next) => {
  if (!req.authorized && !req.server)
    return res.status(401).json({ msg: "Not Authorized" })
  next()
}
