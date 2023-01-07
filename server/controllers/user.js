const { User, Vehicle } = require("../models/dbInfo")

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        ["userId", "id"],
        "email",
        "name",
        ["aadhaarNumber", "aadhaar_number"],
        ["mobileNumber", "mobile_number"],
        "department",
        ["addressLine1", "address_line1"],
        ["addressLine2", "address_line2"],
        "city",
        "state",
        ["pinCode", "pin_code"],
        "country",
        "photo",
        ["idProof", "id_proof"],
        "gender",
        "status",
        "type",
        "reason",
      ],
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
      where: { userId: req.params.id },
      order: [["createdAt", "DESC"]],
      attributes: [
        "id",
        ["VehicleNo", "vehicle_no"],
        ["VehicleType", "vehicle_type"],
        "model",
        ["RCHName", "rch_name"],
        "relation",
        ["RCCopy", "rc_copy"],
        ["userId", "user_id"],
      ],
      offset: req.query.limit * (req.query.page - 1),
      limit: parseInt(req.query.limit),
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

    for (file in req.files) {
      resObj[file] = req.files[file][0].filename
    }
  }

  try {
    const resp = await User.update(resObj, {
      where: { userId: req.params.id },
    })
    if (resp[0] == 0)
      return res.status(404).json({ msg: "User not updated. Try again" })
    // return res.status(200).json({ msg: "User Updated" })
    const user = await User.findByPk(req.params.id, {
      attributes: { excludes: ["password", "createdAt", "updatedAt"] },
    })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}
