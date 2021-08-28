require("dotenv").config();
const Sequelize = require("sequelize");
const { User } = require("../db");

const mapUpdate = (user, updateData) => {
  for (const property in updateData) {
    user[property] = updateData[property];
  }
};

const changePassword = async (req, res, _next) => {
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
    res.status(401).send(error.message);
  }
};

module.exports = {
  changePassword,
};
