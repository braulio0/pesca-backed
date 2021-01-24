const express = require('express');
const router = express.Router();
const { create, findOne, update} = require('./../controllers/Login.controllers.js');

router.post('/registro', create);
router.post('/:password/:email', findOne);
router.put('/:email', update );
module.exports = router;
