import pool from '../db.js';

export const listar = async () => {
  const [rows] = await pool.query('SELECT * FROM Cliente');
  return rows;
};

export const buscarPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Cliente WHERE ID_Cliente = ?', [id]);
  return rows[0];
};

export const adicionar = async (cliente) => {
  const { Nome, Telefone, Email, Senha, Historico_servico, Program_Fidelidade, Preferencia } = cliente;
  const [result] = await pool.query(
    `INSERT INTO Cliente (Nome, Telefone, Email, Senha) VALUES (?, ?, ?, ?)`,
    [Nome, Telefone, Email, Senha]
  );
  return { id: result.insertId, ...cliente };
};

export const editar = async (id, novosDados) => {
  const keys = Object.keys(novosDados);
  const values = Object.values(novosDados);
  const setString = keys.map(key => `${key} = ?`).join(', ');
  
  const [result] = await pool.query(
    `UPDATE Cliente SET ${setString} WHERE ID_Cliente = ?`,
    [...values, id]
  );

  if(result.affectedRows === 0) return null;

  return buscarPorId(id);
};

export const excluir = async (id) => {
  const [result] = await pool.query('DELETE FROM Cliente WHERE ID_Cliente = ?', [id]);
  return result.affectedRows > 0;
};