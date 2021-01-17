const express = require('express');
const router = express.Router();
const { create, findAll, findOne, update } = require('./../controllers/Clubs.controllers.js');

router.post('/registro', create);
router.get('/:name', findOne);
router.put('/:name', update);
router.get('/', findAll)
module.exports = router;
