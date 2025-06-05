
import express from 'express';
import * as controller from '../controllers/agendamentoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/agendados', verificarToken, controller.agendamentosPorDataEProfissional);
router.get('/disponiveis', controller.horariosDisponiveis);
router.get('/', verificarToken, controller.listar);
router.get('/:id', verificarToken ,controller.buscarPorId);
router.post('/', verificarToken, controller.adicionar);
router.put('/:id', verificarToken, controller.editar);
router.delete('/:id', verificarToken, controller.excluir);

export default router;
