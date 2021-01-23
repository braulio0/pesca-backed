const express = require('express');
const router = express.Router();
const { create, findOne} = require('./../controllers/Login.controllers.js');

router.post('/registro', create);
router.get('/:password/:email', findOne);
module.exports = router;
