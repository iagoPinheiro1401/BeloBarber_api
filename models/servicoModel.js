import pool from '../db.js';

// Adicionar serviço
export const adicionarServico = async ({ Nome, Preco }) => {
  const [result] = await pool.query(
    'INSERT INTO servicos (Nome, Preco) VALUES (?, ?)',
    [Nome, Preco]
  );
  return result;
};

// Listar todos os serviços
export const listarServicos = async () => {
  const [rows] = await pool.query('SELECT * FROM servicos');
  return rows;
};

// Buscar serviço por ID
export const buscarServicoPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM servicos WHERE ID_Servico = ?', [id]);
  return rows[0];
};

// Atualizar serviço
export const editarServico = async (id, { Nome, Preco }) => {
  const [result] = await pool.query(
    'UPDATE servicos SET Nome = ?, Preco = ? WHERE ID_Servico = ?',
    [Nome, Preco, id]
  );
  return result;
};

// Deletar serviço
export const excluirServico = async (id) => {
  const [result] = await pool.query('DELETE FROM servicos WHERE ID_Servico = ?', [id]);
  return result;
};
