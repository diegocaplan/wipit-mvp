const Sequelize = require("sequelize");
const { User } = require("../db");

const getUsers = async (req, res, _next) => {
  try {
    const { email, userName, googleAccounts } = req.query;
    if (email) {
      let foundMail = await User.findOne({ where: { email: email } });
      return res.json(foundMail);
    } else if (userName) {
      let foundUserName = await User.findOne({ where: { userName: userName } });
      return res.json(foundUserName);
    } else if (googleAccounts) {
      User.findAll({ where: { googleAccount: true } }).then((response) =>
        res.json(response)
      );
    } else {
      User.findAll({
        order: ["userName"]
      }).then((response) => res.json(response));
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getUsers,
};
