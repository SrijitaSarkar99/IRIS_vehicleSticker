const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/dbInfo')

exports.signUp = async (req, res) => {
  // TODO: Implement the function
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
  const { aadharNumber, password } = req.body
  let user
  try {
    user = await User.findOne({
      attributes: ['userId', 'name', 'aadharNumber', 'password'],
      where: { aadharNumber: aadharNumber },
    })
    if (!user) {
      return res.status(404).json({ msg: 'Invalid User' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ msg: 'Wrong Password' })
    }
  } catch (error) {
    res.status(500).json({ err: error })
  }

  // JWT SETUP
  jwt.sign(
    { userId: user.userId, name: user.name, aadharNumber: user.aadharNumber },
    process.env.privateKey,
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
  res.json({ msg: 'Logged Out' })
}

exports.isAuthenticated = (req, res, next) => {
  let token = ''
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] == 'Bearer'
  )
    token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, process.env.privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: 'Not authenticated' })
    }
    next()
  })
}
