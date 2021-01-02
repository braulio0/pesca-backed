const express = require('express');
const router = express.Router();
const { create, findOne, update } = require('./../controllers/Clubs.controllers.js');

router.post('/registro', create);
router.get('/:name', findOne);
router.put('/:name', update);

module.exports = router;
