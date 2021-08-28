const { Router } = require("express");
const router = Router();
const {
  getAllTasks,
  getTasksByUser,
} = require("../../controllers/getTasks.js");

router.get("/", async (req, res, _next) => {
  const { userName } = req.query; 
  try {
    if (userName) {
      return res.json(await getTasksByUser(userName));
    }
    return res.json(await getAllTasks());
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
