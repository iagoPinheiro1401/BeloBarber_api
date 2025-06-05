import { buscarRelatorioPorPeriodo } from "../models/relatorioModel.js";

export const relatorioPorPeriodo = async (req, res) => {
  try {
    const { periodo } = req.query;

    if (!periodo) {
      return res.status(400).json({ error: "O parâmetro 'periodo' é obrigatório." });
    }

    const idProfissional = req.usuario.ID_Profissional;

    if (!idProfissional) {
      return res.status(403).json({ error: "Acesso negado: usuário não é um profissional." });
    }

    const relatorio = await buscarRelatorioPorPeriodo(idProfissional, periodo);

    res.json(relatorio);
  } catch (error) {
    console.error("Erro ao buscar relatório:", error);
    res.status(500).json({ error: "Erro ao buscar relatório." });
  }
};