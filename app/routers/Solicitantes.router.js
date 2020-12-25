const express = require('express');
const router = express.Router();
const { create } = require('./../controllers/Solicitante.controller.js');

router.post('/registro', create );
router.get('/:email', );
router.put('/:email/actualizar', );

module.exports = router;
