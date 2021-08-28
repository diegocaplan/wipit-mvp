const { Router } = require('express');
const { conn, Task, User, Language } = require('../db');
const router = Router();

router.get('/', async function (req, res, next) {
  var tasks = await Task.findAll({
    include: [{
      model: Language, as: 'languages', through: {
        attributes: [],
      }
    },
    {
      model: User, as: 'author', attributes: { exclude: ['password'] }
    },
    {
      model: User, as: 'assigned', attributes: { exclude: ['password'] }, through: {
        attributes: [],
      }
    }]
  })
  tasks = tasks.map(task => task.get({ plain: true }))
  tasks.forEach(task => task.languages = task.languages.map(language => language.name))
  res.send(tasks);
})

module.exports = router;