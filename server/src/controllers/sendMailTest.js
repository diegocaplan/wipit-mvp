require('dotenv').config();
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer")
const { EMAILER_DIR, EMAILER_PW } = process.env;

const sendEmail = async (req, res, _next) => {
  const { email, code } = req.body
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAILER_DIR,
        pass: EMAILER_PW
      }
    })

    const mailOptions = {
      from: "Remitente",
      to: email,
      subject: "Wipit Board",
      text: `Hola! Esta es una breve confirmacion para verificar tu cuenta, usa este codigo para validar ${code}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error.message)
      }
      else {
        res.status(200).json("mail enviado")
      }
    })
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  sendEmail,
};
