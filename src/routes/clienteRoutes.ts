import { Router } from 'express';
import clienteController from '../controllers/clienteController';
import { autenticar } from '../middlewares/autenticar';

const router = Router();

router.use(autenticar); // 🔒 Protege todas as rotas abaixo

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.patch('/:id/status', clienteController.alterarStatus);

export default router;
