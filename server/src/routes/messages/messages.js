const router = require("express").Router();
const { Message, User } = require("../../db");


router.get("/:id", async function (req, res, next) {
  const id = req.params.id
  try {
    const messages = await Message.findAll({
      where: {
        task_id: id
      }
    })
    if (messages) return res.send(messages);
    return res.send({ msg: "no hay mensajes que mostrar" })
  } catch (error) {
    next(error);
  }
})

router.post("/", async function (req, res, next) {
  const { content, room, status, user } = req.body;
  try {
    const newMessage = await Message.create({
      content,
      task_id: room,
      status
    });
    await user && newMessage.setWriter(user)
    res.send(newMessage);
  } catch (error) {
    next(error);
  }
});


module.exports = router;