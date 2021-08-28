require("dotenv").config();
const Sequelize = require("sequelize");
const nodemailer = require("nodemailer");
const { User } = require("../db");

const mapUpdate = (user, updateData) => {
  for (const property in updateData) {
    if (updateData[property] === updateData.email) {
      return null;
    }
    user[property] = updateData[property];
  }
};

const editUser = async (req, res, _next) => {
  const updateData = req.body;
  try {
    let exist = await User.findOne({ where: { email: updateData.email } });
    if (!exist) res.status(210).send("Usuario no encontrado");
    else {
      mapUpdate(exist, updateData);
      exist.save();
      return res.json(exist);
    }
  } catch (error) {
    res.status(401).send(error.massage);
  }
};

module.exports = {
  editUser,
};
