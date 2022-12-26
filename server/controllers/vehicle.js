const { Vehicle, Sticker } = require("../models/dbInfo")

exports.addVehicle = async (req, res) => {
  req.body.RCCopy = req.file.filename
  try {
    const vehicle = await Vehicle.create({
      ...req.body,
      userId: req.user.userId,
    })

    res.status(200).json(vehicle)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.vehicleid, {
      attributes: { exclude: ["updatedAt"] },
    })
    if (!vehicle) {
      return res.status(404).json({ msg: "Vehicle not found" })
    }
    if (req.user && req.user.userId !== vehicle.userId)
      return res.status(401).json({ msg: "Not authorized" })
    res.status(200).json(vehicle)
  } catch (error) {
    res.status(500).json({ err: "error" })
  }
}

exports.getVehicleSticker = async (req, res) => {
  try {
    const sticker = await Sticker.findAll({
      where: { VehicleId: req.params.vehicleid },
      order: [["createdAt", "DESC"]],
    })
    if (!sticker.length) return res.status(404).json({ msg: "No stickers" })
    if (req.user && sticker[0].userId !== req.user.userId)
      return res.status(401).json({ msg: "Not authorized" })
    return res.status(200).json(sticker)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.updateVehicle = async (req, res) => {
  try {
    if (req.user) {
      const vehicle = await Vehicle.findByPk(req.params.vehicleid, {
        attributes: ["userId"],
      })
      if (vehicle && req.user.userId !== vehicle.userId)
        return res.status(401).json({ msg: "Not authorized" })
    }
    const resp = await Vehicle.update(req.body, {
      where: { id: req.params.vehicleid },
    })
    if (resp[0] === 0)
      return res.status(404).json({ msg: "Vehicle not updated. Try again" })
    return res.status(200).json({ msg: "Vehicle Updated" })
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}
