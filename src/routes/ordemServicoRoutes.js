const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordemServicoController');
const autenticar = require('../middlewares/autenticar');

router.use(autenticar);

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/finalizar', controller.finalizar);
router.patch('/:id/cancelar', controller.cancelar);

module.exports = router;
