const Department = require('../models/department')

exports.addNewDepartment = async (req, res) => {
  const department = Department.build(req.body)
  try {
    const resp = await department.save()
    res.json(resp)
  } catch (error) {
    res.json({ err: error })
  }
}
