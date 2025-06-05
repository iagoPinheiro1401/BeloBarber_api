import pool from '../db.js';

export const listar = async () => {
  const [rows] = await pool.query('SELECT * FROM profissionais');
  return rows;
};

export const buscarPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM profissionais WHERE ID_Profissional = ?', [id]);
  return rows[0];
};

export const adicionar = async (profissional) => {
  const { Nome, Telefone, Email, Senha } = profissional;
  const [result] = await pool.query(
    `INSERT INTO profissionais (Nome, Telefone, Email, Senha) VALUES (?, ?, ?, ?)`,
    [Nome, Telefone, Email, Senha]
  );
  return { id: result.insertId, ...profissional };
};

export const editar = async (id, novosDados) => {
  const keys = Object.keys(novosDados);
  const values = Object.values(novosDados);
  const setString = keys.map(key => `${key} = ?`).join(', ');
  
  const [result] = await pool.query(
    `UPDATE profissionais SET ${setString} WHERE ID_Profissional = ?`,
    [...values, id]
  );

  if(result.affectedRows === 0) return null;

  return buscarPorId(id);
};

export const excluir = async (id) => {
  const [result] = await pool.query('DELETE FROM profissionais WHERE ID_Profissional = ?', [id]);
  return result.affectedRows > 0;
};