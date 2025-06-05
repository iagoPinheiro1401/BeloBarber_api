import {
  adicionarServico,
  listarServicos,
  buscarServicoPorId,
  editarServico,
  excluirServico
} from '../models/servicoModel.js';

// Criar serviço
export const adicionar = async (req, res) => {
  try {
    const { Nome, Preco } = req.body;

    if (!Nome || Preco === undefined) {
      return res.status(400).json({ erro: 'Nome e Preço são obrigatórios' });
    }

    await adicionarServico({ Nome, Preco });
    res.status(201).json({ mensagem: 'Serviço criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ erro: 'Erro interno ao criar serviço' });
  }
};

// Listar todos os serviços
export const listar = async (req, res) => {
  try {
    const servicos = await listarServicos();
    res.json(servicos);
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    res.status(500).json({ erro: 'Erro ao listar serviços' });
  }
};

// Buscar serviço por ID
export const buscarPorId = async (req, res) => {
  try {
    const servico = await buscarServicoPorId(req.params.id);
    if (!servico) {
      return res.status(404).json({ erro: 'Serviço não encontrado' });
    }
    res.json(servico);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({ erro: 'Erro ao buscar serviço' });
  }
};

// Atualizar serviço
export const editar = async (req, res) => {
  try {
    const { Nome, Preco } = req.body;
    const resultado = await editarServico(req.params.id, { Nome, Preco });

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado para atualizar' });
    }

    res.json({ mensagem: 'Serviço atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ erro: 'Erro ao atualizar serviço' });
  }
};

// Deletar serviço
export const excluir = async (req, res) => {
  try {
    const resultado = await excluirServico(req.params.id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Serviço não encontrado para deletar' });
    }
    res.json({ mensagem: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ erro: 'Erro ao deletar serviço' });
  }
};
