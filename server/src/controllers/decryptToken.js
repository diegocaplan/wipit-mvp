const Sequelize = require("sequelize");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_JWT_KEY } = process.env;
const bcrypt = require("bcrypt");

const decryptToken = async (req, res, _next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null || token == undefined) {
      return res.status(401).send("INVALID TOKEN");
    }
    jwt.verify(token, SECRET_JWT_KEY, (err, user) => {
      if (err) res.status(403).send('ERROR')
      else {
        User.findOne({ where: { userName: user.userName } })
          .then(response => {
            return res.json(response.dataValues)
          })
      }
    })
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  decryptToken,
};
