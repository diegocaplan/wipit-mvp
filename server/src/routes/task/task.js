const router = require("express").Router();
const { Task, User, Language } = require("../../db");

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const task = await Task.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
        },
        {
          model: User,
          as: "assigned",
        },
        {
          model: Language,
        },
      ],
    }); //incluir a los asignados
    if (task) return res.send(task);
    return res.send({ msg: "that task dont exist" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const {
    copyOriginalID,
    languages,
    userName,
    title,
    description,
    status,
    purpose,
    area,
    difficulty,
    howlong,
    otherLang,
  } = req.body;

  try {
    const newTask = await Task.create({
      copyOriginalID: copyOriginalID,
      title,
      description,
      status,
      purpose,
      area,
      difficulty,
      howlong,
      otherLang,
    });
    const userFinded = await User.findOne({ where: { userName: userName } });
    (await userFinded) && (await newTask.setAuthor(userFinded));
    (await languages) && newTask.setLanguages(languages);
    res.send(newTask);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    task.deleted = true;
    task.save();
    return res.send("Task has been eliminated");
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, _next) => {
  const { updatedTask, userName } = req.body;
  const { id: task_id } = req.params;
  if (validate(updatedTask)) return res.status(400).send("Invalid data");
  try {
    let task = await Task.findByPk(task_id);
    mapUpdate(task, updatedTask);
    if (userName) {
      await task.setAssigned(userName);
      return res.send(task);
    }
    task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(401).send(error.massage);
  }
});

const mapUpdate = (task, updateData) => {
  for (const property in updateData) {
    task[property] = updateData[property];
  }
};

const validate = (data) => {
  return false;
};

module.exports = router;
