import express from 'express';
import controller from '../controllers/produtoServicoController';

const router = express.Router();

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/status', controller.alterarStatus);

export default router;
