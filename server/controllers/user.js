const { User, Vehicle } = require("../models/dbInfo")
const path = require("path")
const fs = require("fs")

exports.getUserById = async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: [
                ["userId", "id"],
                "email",
                "name", ["aadharNumber", "aadhar_number"],
                ["mobileNumber", "mobile_number"],
                "department", ["addressLine1", "address_line1"],
                ["addressLine2", "address_line2"],
                "city",
                "state", ["pinCode", "pin_code"],
                "country",
                "photo", ["idProof", "id_proof"],
                "gender",
                "status",
                "type",
                "reason",
                "iris_id",
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

exports.getUserVehicle = async(req, res) => {
    try {
        const vehicle = await Vehicle.findAll({
            where: { userId: req.query.user_id },
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

exports.updateUser = async(req, res) => {
    let resObj = {}
    if (req.server) {
        for (const prop in req.body) {
            if (prop != "status" && prop != "reason") {
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
            resObj[
                file
            ] = req.files[file][0].filename
        }
    }

    let user

    try {
        user = await User.findByPk(req.params.id, {
            attributes: ["photo", "idProof"],
        })

        for (const prop in user.dataValues) {
            if (
                (resObj.photo && prop == "photo" && user.dataValues[prop]) ||
                (resObj.idProof && prop == "idProof" && user.dataValues[prop])
            ) {
                const pathArr = user[prop].split("/")
                let filePath = path.join(
                    __dirname,
                    "../public/files",
                    prop,
                    pathArr[pathArr.length - 1]
                )
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            }
        }

        // return res.json(user)
        const resp = await User.update(resObj, {
            where: { userId: req.params.id },
        })
        if (resp[0] == 0)
            return res.status(404).json({ msg: "User not updated. Try again" })
                // return res.status(200).json({ msg: "User Updated" })
        user = await User.findByPk(req.params.id, {
            attributes: [
                ["userId", "id"],
                "email",
                "name", ["aadharNumber", "aadhar_number"],
                ["mobileNumber", "mobile_number"],
                "department", ["addressLine1", "address_line1"],
                ["addressLine2", "address_line2"],
                "city",
                "state", ["pinCode", "pin_code"],
                "country",
                "photo", ["idProof", "id_proof"],
                "gender",
                "status",
                "type",
                "reason",
                "iris_id",
            ],
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}