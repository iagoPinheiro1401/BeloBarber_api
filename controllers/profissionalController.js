import * as model from '../models/profissionalModel.js';

export const listar = async (req, res) => {
  try {
    const profissionais = await model.listar();
    res.json(profissionais);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar profissionais', erro: error.message });
  }
};

export const buscar = async (req, res) => {
  try {
    const profissional = await model.buscarPorId(parseInt(req.params.id));
    if (profissional) res.json(profissional);
    else res.status(404).json({ mensagem: 'Profissional não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar profissional', erro: error.message });
  }
};

export const adicionar = async (req, res) => {
  try {
    const novoProfissional = await model.adicionar(req.body);
    res.status(201).json(novoProfissional)
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao adicionar profissional', erro: error.message });
  }
};

export const editar = async (req, res) => {
  try {
    const profissionalEditado = await model.editar(parseInt(req.params.id), req.body);
    if (profissionalEditado) res.json(profissionalEditado);
    else res.status(404).json({ mensagem: 'Profissional não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao editar profissional', erro: error.message });
  }
};

export const excluir = async (req, res) => {
  try {
    const resultado = await model.excluir(parseInt(req.params.id));
    if (resultado) res.json({ mensagem: 'Porfissional excluído' });
    else res.status(404).json({ mensagem: 'Porfissional não encontrado' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir prrofissional', erro: error.message });
  }
};
