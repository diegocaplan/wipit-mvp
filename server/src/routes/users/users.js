const User = require("../../models/User");
const { Router, response } = require("express");
const { Sequelize, Op } = require("sequelize");
const { createUser } = require("../../controllers/postUser");
const { getUsers } = require("../../controllers/getUsers");
const {sendEmail} = require("../../controllers/sendMailTest")
const {changePassword} = require("../../controllers/changePassword")
const {updateUser} = require("../../controllers/updateUser")
const router = Router();

router.get("/testing", (req, res) => {
  return res.json("estamos en testing");
});
router.get("/getUsers", getUsers);

router.post("/createUser", createUser);

router.post("/sendEmail", sendEmail)

router.put("/changePassword", changePassword)

router.put("/edit", updateUser)

module.exports = router;
