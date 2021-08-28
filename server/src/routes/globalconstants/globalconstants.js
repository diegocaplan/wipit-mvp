const { Router } = require("express");
const router = Router();
const global_constants = require("../../../global_constants");

router.get("/", (req, res, _next) => {
  return res.json(global_constants);
});

module.exports = router;
