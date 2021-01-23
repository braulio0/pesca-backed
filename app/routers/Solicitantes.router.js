const express = require('express');
const router = express.Router();
const { create, findOne, update, findAll } = require('./../controllers/Solicitante.controller.js');

router.post('/registro', create );
router.get('/:email', findOne );
router.put('/:email/actualizar', update );
router.get('/',findAll)
module.exports = router;
