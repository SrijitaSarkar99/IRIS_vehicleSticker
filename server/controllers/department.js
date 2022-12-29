const { User, Department } = require("../models/dbInfo")

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.departmentid, {
      attributes: { exclude: ["updatedAt"] },
    })
    if (!department) {
      return res.status(404).json({ msg: "Department not found" })
    }

    res.status(200).json(department)
  } catch (error) {
    res.status(500).json({ err: "error" })
  }
}

exports.getAllDepartment = async (req, res) => {
  let departments
  try {
    if (req.user) {
      departments = await Department.findAll({
        order: [["createdAt", "DESC"]],
      })
    } else {
      departments = await Department.findAll({
        order: [["createdAt", "DESC"]],
        offset: 5 * (req.query.pageNo - 1),
        limit: 5,
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

exports.addNewDepartment = async (req, res) => {
  const department = Department.build(req.body)
  try {
    const resp = await department.save()
    res.status(201).json(resp)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

exports.updateDepartment = async (req, res) => {
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
    const updatedDept = await Department.findByPk(req.params.departmentid)
    return res.status(200).json(updatedDept)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.getDepartmentUsers = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.departmentid, {
      attributes: ["dName"],
    })
    if (!department)
      return res.status(400).json({ msg: "Department Doesn't exists" })
    const users = await User.findAll({
      where: { department: department.dName },
      attributes: { exclude: ["password", "updatedAt"] },
      order: [["createdAt", "DESC"]],
      offset: req.query.records * (req.query.pageNo - 1),
      limit: req.query.records,
    })
    if (!users) {
      return res.status(404).json({ msg: "No user exists" })
    }
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}
