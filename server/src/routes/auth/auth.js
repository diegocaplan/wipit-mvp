const User = require("../../models/User");
const { Router, response } = require("express");
const { Sequelize, Op } = require("sequelize");
const { logIn } = require("../../controllers/logIn")
const { decryptToken } = require("../../controllers/decryptToken")
const router = Router();


router.post("/login", logIn);

router.get('/decrypt', decryptToken)


module.exports = router;