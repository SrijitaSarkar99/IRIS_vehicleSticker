const bcrypt = require("bcrypt")
const { User, Otp } = require("../models/dbInfo")
const nodemailer = require("nodemailer")

const sendMail = async (user, otpVal) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.senderEmail,
      pass: process.env.nodemailerPASS,
    },
  })

  const mailOptions = {
    from: process.env.senderEmail,
    to: user.email,
    subject: "RESET YOUR PASSWORD",
    text: `${otpVal} is your OTP for resetPassword. It is valid for 10 minutes`,
  }
  await transporter.sendMail(mailOptions)
}

exports.setOtp = async (req, res) => {
  let { email } = req.query
  email = email ? email.toLowerCase() : email
  let otpVal = Math.floor(Math.random() * 1000000).toString()
  try {
    const token = await bcrypt.hash(otpVal, 10)

    const user = await User.findOne({
      where: { email },
      attributes: ["userId", "email"],
    })

    if (!user) return res.status(404).json({ msg: "User doesn't exists" })
    const prevOtp = await Otp.findOne({ where: { userId: user.userId } })
    if (prevOtp) await Otp.destroy({ where: { userId: user.userId } })
    const otp = Otp.build({
      userId: user.userId,
      validity: new Date(new Date().getTime() + 10 * 60000),
      token,
    })
    const resp = await otp.save()
    await sendMail(user, otpVal)
    return res.status(201).json({
      id: resp.id,
      user_id: resp.userId,
      validity: resp.validity,
    })
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

exports.resetPassowrd = async (req, res) => {
  let { user_id, otp_val, new_password } = req.body
  try {
    const otp = await Otp.findOne({ where: { userId: user_id } })
    if (!otp) return res.status(404).json({ msg: "User doesn't exists" })
    if (new Date().getTime() > otp.validity.getTime())
      return res.status(400).json({ msg: "OTP Expired" })
    const match = await bcrypt.compare(otp_val, otp.token)
    if (!match) return res.status(401).json({ msg: "Wrong OTP" })
    await Otp.destroy({ where: { userId: user_id } })
    if (new_password.length < 8)
      return res
        .status(401)
        .json({ msg: "Password should be of at least 8 character" })
    new_password = await bcrypt.hash(new_password, 10)
    const resp = await User.update(
      { password: new_password },
      {
        where: { userId: user_id },
      }
    )
    if (!resp || resp[0] == 0)
      return res
        .status(500)
        .json({ msg: "Password cannot be reset, Try again later" })
    res.status(200).json({ msg: "Password is Reset" })
  } catch (error) {
    res.status(500).json({ err: error })
  }
}
