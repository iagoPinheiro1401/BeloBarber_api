
import express from 'express';
import * as controller from '../controllers/clienteController.js';

const router = express.Router();

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.adicionar);
router.put('/:id', controller.editar);
router.delete('/:id', controller.excluir);

export default router;
