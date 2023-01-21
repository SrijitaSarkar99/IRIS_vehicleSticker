const { User, Department } = require("../models/dbInfo")

exports.getDepartmentById = async(req, res) => {
    try {
        let department;
        if (req.user)
            department = await Department.findByPk(req.params.departmentid, {
                attributes: [
                    ["did", "id"],
                    ["dName", "d_name"],
                    ["HODorHOS", "hod_or_hos"],
                    ["iris_id", "iris_id"],
                ],
            })
        else if (req.server)
            department = await Department.findOne({ where: { iris_id: req.params.department_iris_id } }, {
                attributes: [
                    ["did", "id"],
                    ["dName", "d_name"],
                    ["HODorHOS", "hod_or_hos"],
                    ["iris_id", "iris_id"],
                ],
            })
        if (!department) {
            return res.status(404).json({ msg: "Department not found" })
        }

        res.status(200).json(department)
    } catch (error) {
        res.status(500).json({ err: "error" })
    }
}

exports.getAllDepartment = async(req, res) => {
    let departments
    try {
        if (req.user) {
            departments = await Department.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: [
                    ["did", "id"],
                    ["dName", "d_name"],
                    ["HODorHOS", "hod_or_hos"],
                    ["iris_id", "iris_id"],
                ],
            })
        } else {
            departments = await Department.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                attributes: [
                    ["did", "id"],
                    ["dName", "d_name"],
                    ["HODorHOS", "hod_or_hos"],
                    ["iris_id", "iris_id"],
                ],
            })
        }
        if (!departments) {
            return res.status(404).json({ msg: "No department exists" })
        }
        return res.status(200).json(departments)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

exports.addNewDepartment = async(req, res) => {
    const department = Department.build(req.body)
    try {
        const resp = await department.save()
        res.status(201).json({
            id: resp.did,
            d_name: resp.dName,
            hod_or_hos: resp.HODorHOS,
            iris_id: resp.iris_id,
        })
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

exports.updateDepartment = async(req, res) => {
    let resObj = {}
    for (const prop in req.body) {
        if (req.body[prop]) resObj[prop] = req.body[prop]
    }
    try {
        const resp = await Department.update(resObj, {
            where: { did: req.params.departmentid },
        })
        if (resp[0] == 0)
            return res.status(404).json({ msg: "User not updated. Try again" })
        const updatedDept = await Department.findByPk(req.params.departmentid, {
            attributes: [
                ["did", "id"],
                ["dName", "d_name"],
                ["HODorHOS", "hod_or_hos"],
                ["iris_id", "iris_id"],
            ],
        })
        return res.status(200).json(updatedDept)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

exports.getDepartmentUsers = async(req, res) => {
    console.log(req.query.limit)
    try {
        let department;
        console.log(req.query);
        if (req.user)
            department = await Department.findByPk(req.query.department_id, {
                attributes: ["dName"],
            })
        else if (req.server)
            department = await Department.findOne({ where: { iris_id: req.query.department_iris_id } })
        console.log(123, department);
        if (!department)
            return res.status(400).json({ msg: "Department Doesn't exists" })
        const users = await User.findAll({
            where: { department: department.dName },
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
                "iris_id"
            ],
            order: [
                ["createdAt", "DESC"]
            ],
        })
        if (!users) {
            return res.status(404).json({ msg: "No user exists" })
        }
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}