import { Router } from 'express';
import controller from '../controllers/ordemServicoController';
import autenticar from '../middlewares/autenticar';

const router = Router();

// Middleware aplicado a todas as rotas abaixo
router.use(autenticar);

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/finalizar', controller.finalizar);
router.patch('/:id/cancelar', controller.cancelar);

export default router;
