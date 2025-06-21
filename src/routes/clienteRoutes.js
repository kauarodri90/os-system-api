const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.patch('/:id/status', clienteController.alterarStatus);

module.exports = router;
