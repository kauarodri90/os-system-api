import express from 'express';
import controller from '../controllers/produtoServicoController';
import { autenticar } from '../middlewares/autenticar';

const router = express.Router();

router.use(autenticar); // 🔒 Protege todas as rotas abaixo

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/status', controller.alterarStatus);

export default router;
