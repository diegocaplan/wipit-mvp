const router = require("express").Router();
const { Feedback } = require("../../db");

router.post("/", async function (req, res, next) {
  const {
    name,
    comments,
  } = req.body;
  try {
    const newFeedback = await Feedback.create({
      name,
      comments
    });
    res.send(newFeedback);
  } catch (error) {
    next(error);
  }
});

module.exports = router;