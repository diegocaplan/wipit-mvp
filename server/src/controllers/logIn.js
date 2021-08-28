const Sequelize = require("sequelize");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_JWT_KEY } = process.env;
const bcrypt = require("bcrypt");

const logIn = async (req, res, _next) => {
  try {
    const body = req.body;
    const { email } = body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(401).send("USER NOT FOUND.");
    }

    const infoToEncrypt = {
      userName: user.userName,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      linkedin: user.linkedin,
      cv: user.cv,
      behance: user.behance,
      webPage: user.webPage,
      description: user.description,
      image: user.image
    };

    const token = jwt.sign(infoToEncrypt, SECRET_JWT_KEY);

    return res.json({
      token,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  logIn,
};
