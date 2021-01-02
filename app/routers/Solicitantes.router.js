const express = require('express');
const router = express.Router();
const { create, findOne, update } = require('./../controllers/Solicitante.controller.js');

router.post('/registro', create );
router.get('/:email', findOne );
router.put('/:email/actualizar', update );

module.exports = router;
