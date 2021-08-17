const router = require('express').Router();
const dogs = require('./dogs')
const temperament = require('./temperaments')
const PostDog = require ('./PostDog')
const deleteDog = require ('./deleteDog')


router.get('/', (_req,res)=>{ res.send("The Space Dogs Api") }); 
router.use('/dog',PostDog)
router.use('/dogs',dogs)
router.use('/temperament',temperament)
router.use('/delete', deleteDog)


module.exports = router;