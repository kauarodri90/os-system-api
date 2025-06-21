const express = require('express');
const router = express.Router();
const controller = require('../controllers/tecnicoController');
const autenticar = require('../middlewares/autenticar');

// Rota pública
router.post('/login', controller.login);

// Rotas protegidas
router.get('/', autenticar, controller.listar);
router.post('/', autenticar, controller.criar);
router.put('/:id', autenticar, controller.atualizar);
router.patch('/:id/status', autenticar, controller.alterarStatus);

module.exports = router;
