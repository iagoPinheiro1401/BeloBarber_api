import * as model from '../models/clienteModel.js';

export const listar = async (req, res) => {
  try {
    const clientes = await model.listar();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar clientes', erro: error.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const cliente = await model.buscarPorId(parseInt(req.params.id));
    if (cliente) res.json(cliente);
    else res.status(404).json({ mensagem: 'Cliente não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar cliente', erro: error.message });
  }
};

export const adicionar = async (req, res) => {
  try {
    const novoCliente = await model.adicionar(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao adicionar cliente', erro: error.message });
  }
};

export const editar = async (req, res) => {
  try {
    const clienteEditado = await model.editar(parseInt(req.params.id), req.body);
    if (clienteEditado) res.json(clienteEditado);
    else res.status(404).json({ mensagem: 'Cliente não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao editar cliente', erro: error.message });
  }
};

export const excluir = async (req, res) => {
  try {
    const resultado = await model.excluir(parseInt(req.params.id));
    if (resultado) res.json({ mensagem: 'Cliente excluído' });
    else res.status(404).json({ mensagem: 'Cliente não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir cliente', erro: error.message });
  }
};
