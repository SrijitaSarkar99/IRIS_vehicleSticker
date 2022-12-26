const { User, Vehicle } = require("../models/dbInfo")

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userid, {
      attributes: { exclude: ["password", "updatedAt"] },
    })
    if (!user) {
      return res.status(404).json({ msg: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ err: "error" })
  }
}

exports.getUserVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    })
    if (!vehicle.length) return res.status(404).json({ msg: "No vehicle" })
    return res.status(200).json(vehicle)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.updateUser = async (req, res) => {
  let resObj = {}
  if (req.server) {
    for (const prop in req.body) {
      if (prop != "status" || prop != "reason") {
        return res.status(401).json({ msg: "Not authorized" })
      }
      if (req.body[prop]) resObj[prop] = req.body[prop]
    }
  } else {
    for (const prop in req.body) {
      if (prop == "status" || prop == "reason") {
        return res.status(401).json({ msg: "Not authorized" })
      }
      if (req.body[prop]) resObj[prop] = req.body[prop]
    }
  }

  try {
    const resp = await User.update(resObj, {
      where: { userId: req.params.userid },
    })
    if (resp[0] == 0)
      return res.status(404).json({ msg: "User not updated. Try again" })
    return res.status(200).json({ msg: "User Updated" })
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}
