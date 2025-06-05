
import pool from '../db.js';

export const adicionarAgendamento = async (agendamento) => {
  const { Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico } = agendamento;
  const [result] = await pool.query(
    'INSERT INTO agendamento (Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico) VALUES (?, ?, ?, ?, ?, ?)',
    [Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico]
  );
  return result;
};

export const listarAgendamentos = async () => {
  const [rows] = await pool.query('SELECT * FROM agendamento');
  return rows;
};

export const buscarAgendamentoPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM agendamento WHERE ID_Agendamento = ?', [id]);
  return rows[0];
};

export const editarAgendamento = async (id, agendamento) => {
  const { Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico } = agendamento;
  const [result] = await pool.query(
    'UPDATE agendamento SET Data = ?, Hora = ?, Status = ?, ID_Cliente = ?, ID_Profissional = ?, ID_Servico = ? WHERE ID_Agendamento = ?',
    [Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico, id]
  );
  return result;
};

export const excluirAgendamento = async (id) => {
  const [result] = await pool.query('DELETE FROM agendamento WHERE ID_Agendamento = ?', [id]);
  return result;
};

export const buscarHorariosAgendados = async (data, idProfissional) => {
  const [rows] = await pool.query(
    'SELECT Hora FROM agendamento WHERE Data = ? AND ID_Profissional = ?',
    [data, idProfissional]
  );
  return rows;
};

export const buscarAgendamentosPorDataEProfissionalComCliente = async (data, idProfissional) => {
  const [rows] = await pool.query(
    `SELECT 
        a.Hora, 
        c.Nome AS Cliente, 
        s.Nome AS Servicos, 
        s.Preco
     FROM agendamento a
     JOIN cliente c ON a.ID_Cliente = c.ID_Cliente
     JOIN servicos s ON a.ID_Servico = s.ID_Servico
     WHERE a.Data = ? AND a.ID_Profissional = ?
     ORDER BY a.Hora`,
    [data, idProfissional]
  );
  return rows;
};
