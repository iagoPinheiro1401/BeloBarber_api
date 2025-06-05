import express from 'express';
import {
  adicionar,
  listar,
  buscarPorId,
  editar,
  excluir
} from '../controllers/servicoController.js';

const router = express.Router();

router.post('/', adicionar);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.put('/:id', editar);
router.delete('/:id', excluir);

export default router;
