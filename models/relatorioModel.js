import pool from "../db.js";

export const buscarRelatorioPorPeriodo = async (idProfissional, periodo) => {
  let sqlPeriodo = "";

  if (periodo === "semanal") {
    sqlPeriodo = `
      WHERE a.ID_Profissional = ? 
        AND a.Data BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
    `;
  } else if (periodo === "mensal") {
    sqlPeriodo = `
      WHERE a.ID_Profissional = ? 
        AND a.Data BETWEEN CURDATE() - INTERVAL 1 MONTH AND CURDATE()
    `;
  } else {
    throw new Error("Período inválido. Use 'semanal' ou 'mensal'.");
  }

  const sql = `
    SELECT 
      COUNT(*) AS totalAgendamentos,
      SUM(s.Preco) AS faturamento,
      s.Nome AS servico,
      COUNT(s.Nome) AS quantidadeServico
    FROM agendamento a
    JOIN servicos s ON a.ID_Servico = s.ID_Servico
    ${sqlPeriodo}
    GROUP BY s.Nome
  `;

  const [rows] = await pool.query(sql, [idProfissional]);
  return rows;
};