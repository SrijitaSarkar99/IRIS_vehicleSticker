const { Vehicle, Sticker } = require("../models/dbInfo")
const path = require("path")
const fs = require("fs")

exports.addVehicle = async(req, res) => {
    req.body.RCCopy = req.file.filename
    try {
        const vehicle = await Vehicle.create({
            ...req.body,
            userId: req.user.userId,
        })


        res.status(200).json({
            id: vehicle.id,
            vehicle_no: vehicle.VehicleNo,
            vehicle_type: vehicle.VehicleType,
            model: vehicle.model,
            rch_name: vehicle.RCHName,
            relation: vehicle.relation,
            rc_copy: vehicle.RCCopy,
            user_id: vehicle.userId,
        })
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

exports.getVehicle = async(req, res) => {
    try {
        let vehicle;
        if (req.query.user_id)
            vehicle = await Vehicle.findAll({
                where: {
                    UserId: req.query.user_id
                },
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: [
                    "id", ["VehicleNo", "vehicle_no"],
                    ["VehicleType", "vehicle_type"],
                    "model", ["RCHName", "rch_name"],
                    "relation", ["RCCopy", "rc_copy"],
                    ["userId", "user_id"],
                ],
            })
        else
            vehicle = await Vehicle.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: [
                    "id", ["VehicleNo", "vehicle_no"],
                    ["VehicleType", "vehicle_type"],
                    "model", ["RCHName", "rch_name"],
                    "relation", ["RCCopy", "rc_copy"],
                    ["userId", "user_id"],
                ],
            })
        return res.status(200).json(vehicle)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

exports.getVehicleSticker = async (req, res) => {
  console.log(req.query.user_id)
  console.log(req.query.vehicle_id)
  try {
    const sticker = await Sticker.findAll({
      where: {
        [req.query.vehicle_id? 'VehicleId': 'userId']: req.query.vehicle_id
          ? req.query.vehicle_id
          : req.query.user_id,
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
    if (!sticker.length) return res.status(404).json({ msg: "No stickers" })
    // if (req.user && sticker[0].userId !== req.user.userId)
    //   return res.status(401).json({ msg: "Not authorized" })
    return res.status(200).json(sticker)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.getVehicleSticker = async(req, res) => {
    // console.log(req.query.vehicle_id)
    try {
        let sticker;
        if (req.query.vehicle_id)
            sticker = await Sticker.findAll({
                where: {
                    VehicleId: req.query.vehicle_id
                },
                attributes: [
                    ["sid", "id"],
                    ["userId", "user_id"],
                    ["VehicleId", "vehicle_id"],
                    "date",
                    "validity",
                    "status", ["dName", "d_name"],
                    "reason",
                ],
                order: [
                    ["createdAt", "DESC"]
                ],
            })
        else
            sticker = await Sticker.findAll({
                where: {
                    UserId: req.query.user_id
                },
                attributes: [
                    ["sid", "id"],
                    ["userId", "user_id"],
                    ["VehicleId", "vehicle_id"],
                    "date",
                    "validity",
                    "status", ["dName", "d_name"],
                    "reason",
                ],
                order: [
                    ["createdAt", "DESC"]
                ],
            })
        return res.status(200).json(sticker)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

exports.updateVehicle = async(req, res) => {
    let vehicle
    try {
        if (req.user) {
            vehicle = await Vehicle.findByPk(req.params.vehicleid, {
                attributes: ["userId"],
            })
            if (vehicle && req.user.userId !== vehicle.userId)
                return res.status(401).json({ msg: "Not authorized" })
        }
        if (req.file)
            req.body.RCCopy = req.file.filename

        // Remove previous file
        vehicle = await Vehicle.findByPk(req.params.vehicleid, {
            attributes: ["RCCopy"],
        })

        for (const prop in vehicle.dataValues) {
            if (req.body.RCCopy) {
                const pathArr = vehicle[prop].split("/")
                let filePath = path.join(
                    __dirname,
                    "../public/files",
                    prop,
                    pathArr[pathArr.length - 1]
                )
                console.log(filePath)
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
            }
        }

        const resp = await Vehicle.update(req.body, {
            where: { id: req.params.vehicleid },
        })
        if (resp[0] === 0)
            return res.status(404).json({ msg: "Vehicle not updated. Try again" })
        vehicle = await Vehicle.findByPk(req.params.vehicleid, {
            attributes: [
                "id", ["VehicleNo", "vehicle_no"],
                ["VehicleType", "vehicle_type"],
                "model", ["RCHName", "rch_name"],
                "relation", ["RCCopy", "rc_copy"],
                ["userId", "user_id"],
            ],
        })
        return res.status(200).json(vehicle)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}