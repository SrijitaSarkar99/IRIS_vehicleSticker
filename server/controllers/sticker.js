const { Sticker } = require("../models/dbInfo")

exports.getSticker = async (req, res) => {
  // This route expect a query param "evaluationBy"
  // if evaluationBy is defined then return stickers accounding to it
  // else return all stickers
  try {
    let stickers
    if (!req.query.evaluationBy) {
      stickers = await Sticker.findAll({
        order: [["createdAt", "DESC"]], // TODO: Not Working
        offset: 5 * (req.query.pageNo - 1),
        limit: 5,
      })
      return res.status(200).json(stickers)
    } else {
      stickers = await Sticker.findAll({
        attributes: { exclude: ["updatedAt"] },
        where: {
          status:
            req.query.evaluationBy === "FIC" ? "unapproved" : "approved by FIC",
        },
        order: [["createdAt", "DESC"]], // TODO: Not Working
        offset: 5 * (req.query.pageNo - 1),
        limit: 5,
      })
    }
    if (!stickers) return res.status(404).json({ msg: "No stickers" })
    return res.status(200).json(stickers)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.getStickerById = async (req, res) => {
  // TODO: Restrict access for non authorized user
  try {
    const sticker = await Sticker.findByPk(req.params.stickerid, {
      attributes: { exclude: ["updatedAt"] },
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
  const sticker = Sticker.build({ ...req.body, userId: req.user.userId })
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
      if (res[0] == 0)
        return res.status(404).json({ msg: "Sticker not updated. Try again" })
      return res.status(200).json({ msg: "Sticker is Updated" })
    } catch (error) {
      return res.status(500).json({ err: error })
    }
  } else {
    return res.status(400).json({
      msg: "Invalid value passed in evaluatedBy field or status field",
    })
  }
}
