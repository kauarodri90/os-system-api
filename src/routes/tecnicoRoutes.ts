import express from 'express';
import controller from '../controllers/tecnicoController';
import autenticar from '../middlewares/autenticar';

const router = express.Router();

// Rota pública
router.post('/login', controller.login);

// Rotas protegidas
router.get('/', autenticar, controller.listar);
router.post('/', autenticar, controller.criar);
router.put('/:id', autenticar, controller.atualizar);
router.patch('/:id/status', autenticar, controller.alterarStatus);

export default router;
