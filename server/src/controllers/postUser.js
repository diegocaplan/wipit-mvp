const Sequelize = require("sequelize");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, _next) => {
  const { userName, name, lastName, password, email, googleId, image } = req.body;
  try {
    let exists = await User.findOne({ where: { email: email } });
    if (exists) return res.status(210).send(`${email} already has a user`);

    const newUser = await User.create({
      userName,
      name,
      lastName,
      password,
      email,
      googleId,
      image
    });

    return res.json(newUser);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
};
