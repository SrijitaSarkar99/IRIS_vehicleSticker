const User = require('../models/user')

exports.signUp = async (req, res) => {
  // TODO: Implement the function
  const user = User.build(req.body)
  try {
    const resp = await user.save()
    res.json(resp)
  } catch (error) {
    res.json({ err: error })
  }
}
