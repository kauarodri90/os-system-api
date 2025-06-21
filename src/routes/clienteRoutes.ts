import { Router } from 'express';
import clienteController from '../controllers/clienteController';

const router = Router();

router.get('/', clienteController.listar);
router.post('/', clienteController.criar);
router.put('/:id', clienteController.atualizar);
router.patch('/:id/status', clienteController.alterarStatus);

export default router;
