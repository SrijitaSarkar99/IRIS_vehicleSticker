const { Sticker } = require("../models/dbInfo")
const { getVehicleSticker } = require("./vehicle")

getSpecificSticker = async (req, res) => {
  // This route expect a query param "evaluationBy"
  // if evaluationBy is defined then return stickers accounding to it
  // else return all stickers
  try {
    let stickers
    if (!req.query.evaluation_by) {
      stickers = await Sticker.findAll({
        attributes: [
          ["sid", "id"],
          ["userId", "user_id"],
          ["VehicleId", "vehicle_id"],
          "date",
          "validity",
          "status",
          ["dName", "d_name"],
          "reason",
        ],
        offset: req.query.limit * (req.query.page - 1),
        limit: parseInt(req.query.limit),
      })
      return res.status(200).json(stickers)
    } else {
      stickers = await Sticker.findAll({
        where: {
          status:
            req.query.evaluation_by === "FIC"
              ? "unapproved"
              : "approved by FIC",
        },
        attributes: [
          ["sid", "id"],
          ["userId", "user_id"],
          ["VehicleId", "vehicle_id"],
          "date",
          "validity",
          "status",
          ["dName", "d_name"],
          "reason",
        ],
        order: [["createdAt", "DESC"]],
        offset: req.query.limit * (req.query.page - 1),
        limit: parseInt(req.query.limit),
      })
    }
    if (!stickers) return res.status(404).json({ msg: "No stickers" })
    return res.status(200).json(stickers)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.getSticker = async (req, res) => {
  if (req.query.vehicle_id || req.query.user_id) {
    return await getVehicleSticker(req, res)
  }

  return await getSpecificSticker(req, res)
}

exports.getAllStickers = async (req, res) => {
  try {
    let stickers
    stickers = await Sticker.findAll({
      attributes: [
        ["sid", "id"],
        ["userId", "user_id"],
        ["VehicleId", "vehicle_id"],
        "date",
        "validity",
        "status",
        ["dName", "d_name"],
        "reason",
      ],
    })
    return res.status(200).json(stickers)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.getStickerById = async (req, res) => {
  //  TODO: Restrict access for non authorized user
  try {
    const sticker = await Sticker.findByPk(req.params.stickerid, {
      attributes: [
        ["sid", "id"],
        ["userId", "user_id"],
        ["VehicleId", "vehicle_id"],
        "date",
        "validity",
        "status",
        ["dName", "d_name"],
        "reason",
      ],
    })
    if (!sticker) {
      return res.status(404).json({ msg: "Sticker not found" })
    }

    res.status(200).json(sticker)
  } catch (error) {
    res.status(500).json({ err: "error" })
  }
}

exports.addNewSticker = async (req, res) => {
  const sticker = Sticker.build({ ...req.body, userId: req.body.userId })
  try {
    const resp = await sticker.save()
    res.status(201).json(resp)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

exports.updateSticker = async (req, res) => {
  const { evaluatedBy, status, reason } = req.body
  if (
    (evaluatedBy === "FIC" || evaluatedBy === "CSO") &&
    (status == "approved" || status == "denied")
  ) {
    try {
      const resp = await Sticker.update(
        {
          status:
            evaluatedBy === "FIC"
              ? status === "approved"
                ? "approved by FIC"
                : "denied by FIC"
              : status === "approved"
              ? "approved by CSO"
              : "denied by CSO",
          reason,
        },
        {
          where: { sid: req.params.stickerid },
        }
      )
      if (resp[0] == 0)
        return res.status(404).json({ msg: "Sticker not updated. Try again" })
      const updatedSticker = await Sticker.findByPk(req.params.stickerid, {
        attributes: [
          ["sid", "id"],
          ["userId", "user_id"],
          ["VehicleId", "vehicle_id"],
          "date",
          "validity",
          "status",
          ["dName", "d_name"],
          "reason",
        ],
      })
      return res.status(200).json(updatedSticker)
    } catch (error) {
      return res.status(500).json({ err: error })
    }
  } else {
    return res.status(400).json({
      msg: "Invalid value passed in evaluatedBy field or status field",
    })
  }
}
