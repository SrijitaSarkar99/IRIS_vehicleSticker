const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/dbInfo")

exports.signUp = async (req, res) => {
  // TODO: Implement the function
  for (file in req.files) {
    req.body[file] = req.files[file][0].filename
  }

  const user = User.build(req.body)
  try {
    user.password = await bcrypt.hash(user.password, 10)
    const resp = await user.save()
    res.status(201).json(resp)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

exports.logIn = async (req, res) => {
  const { email, password } = req.body
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
    { userId: user.userId, name: user.name, aadharNumber: user.aadharNumber },
    process.env.privateUserKey,
    function (err, token) {
      if (err) {
        return res.status(500).json({ err })
      }
      return res.status(200).json({
        user: {
          userId: user.userId,
          name: user.name,
          aadharNumber: user.aadharNumber,
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
  req.authorized = req.user.userId === req.params.userid
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
  console.log(req.user)
  console.log(req.server)
  if (!req.user && !req.server)
    return res.status(401).json({ msg: "Not authenticated" })
  next()
}

exports.isAuthorized = (req, res, next) => {
  if (!req.authorized && !req.server)
    return res.status(401).json({ msg: "Not Hello bro" })
  next()
}
