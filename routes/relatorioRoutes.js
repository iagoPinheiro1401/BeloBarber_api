import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { relatorioPorPeriodo } from "../controllers/relatorioController.js";

const router = express.Router();

router.get("/", verificarToken, relatorioPorPeriodo);

export default router;
