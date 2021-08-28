const { STATUS } = require("../../global_constants.js");
const { Task, User, Language } = require("../db.js");

const getAllTasks = async () => {
  return await Task.findAll({
    include: [
      {
        model: Language,
        through: { attributes: [] },
      },
      {
        model: User,
        as: "author",
        attributes: { exclude: ["password"] },
      },
      {
        model: User,
        as: "assigned",
        through: { attributes: [] },
        attributes: { exclude: ["password"] },
      },
    ],
  });
};
const getTasksByUser = async (userName) => {
  const tasks1 = await Task.findAll({
    where: {
      deleted: false
    },
    include: [{
      model: User,
      as: "assigned",
      where: {
        userName: userName,
      },
      through: { attributes: [] },
      attributes: { exclude: ["password"] },
    },
    {
      model: User,
      as: "author",
      attributes: { exclude: ["password"] },
    },
    {
      model: Language,
      through: { attributes: [] },
    }
    ]
  });
  const tasks2 = await Task.findAll({
    where: {
      deleted: false
    },
    include: [{
      model: User,
      as: "assigned",
      through: { attributes: [] },
      attributes: { exclude: ["password"] },
    },
    {
      model: User,
      as: "author",
      where: {
        userName: userName,
      },
      attributes: { exclude: ["password"] },
    },
    {
      model: Language,
      through: { attributes: [] },
    }
    ]
  });
  tasks = [...tasks1, ...tasks2];
  return tasks;
};

module.exports = {
  getAllTasks,
  getTasksByUser
};
