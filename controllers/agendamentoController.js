
import {
  adicionarAgendamento,
  listarAgendamentos,
  buscarAgendamentoPorId,
  editarAgendamento,
  excluirAgendamento,
  buscarHorariosAgendados,
  buscarAgendamentosPorDataEProfissionalComCliente
} from '../models/agendamentoModel.js';

// Criar agendamento
export const adicionar = async (req, res) => {
  try {
    const { Data, Hora, Status, ID_Profissional, ID_Servico } = req.body;
    const ID_Cliente = req.usuario.ID_Cliente;

    if (!ID_Cliente) {
      return res.status(403).json({ mensagem: "Apenas clientes podem agendar" });
    }

    await adicionarAgendamento({ Data, Hora, Status, ID_Cliente, ID_Profissional, ID_Servico });
    res.status(201).json({ mensagem: "Agendamento criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({ mensagem: "Erro interno ao criar agendamento" });
  }
};


// Listar agendamentos
export const listar = async (req, res) => {
  try {
    const agendamentos = await listarAgendamentos();
    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ erro: 'Erro ao listar agendamentos' });
  }
};

// Buscar agendamento por ID
export const buscarPorId = async (req, res) => {
  try {
    const agendamento = await buscarAgendamentoPorId(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    res.json(agendamento);
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ erro: 'Erro ao buscar agendamento' });
  }
};

// Atualizar agendamento
export const editar = async (req, res) => {
  try {
    const resultado = await editarAgendamento(req.params.id, req.body);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado para atualizar' });
    }
    res.json({ mensagem: 'Agendamento atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' });
  }
};

// Deletar agendamento
export const excluir = async (req, res) => {
  try {
    const resultado = await excluirAgendamento(req.params.id);
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Agendamento não encontrado para deletar' });
    }
    res.json({ mensagem: 'Agendamento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ erro: 'Erro ao deletar agendamento' });
  }
};

export const horariosDisponiveis = async (req, res) => {
  try {
    const { data, idProfissional } = req.query;

    if (!data || !idProfissional) {
      return res.status(400).json({ error: 'Data e idProfissional são obrigatórios.' });
    }

    const gerarHorarios = () => {
      const horarios = [];

      const addIntervalos = (inicio, fim) => {
        let [hora, minuto] = inicio.split(':').map(Number);
        const [horaFim, minutoFim] = fim.split(':').map(Number);

        while (hora < horaFim || (hora === horaFim && minuto < minutoFim)) {
          const h = String(hora).padStart(2, '0');
          const m = String(minuto).padStart(2, '0');
          horarios.push(`${h}:${m}`);

          minuto += 30;
          if (minuto >= 60) {
            minuto = 0;
            hora++;
          }
        }
      };

      addIntervalos('08:00', '12:00');
      addIntervalos('13:00', '19:00');

      return horarios;
    };

    const todosHorarios = gerarHorarios();

    const agendados = await buscarHorariosAgendados(data, idProfissional);
    const horariosIndisponiveis = agendados.map(h => h.Hora.slice(0, 5));

    const horariosDisponiveis = todosHorarios.filter(h => !horariosIndisponiveis.includes(h));

    res.json(horariosDisponiveis);
  } catch (error) {
    console.error('Erro ao buscar horários disponíveis:', error);
    res.status(500).json({ error: 'Erro ao buscar horários disponíveis' });
  }
};

export const agendamentosPorDataEProfissional = async (req, res) => {
  try {
    const { data, idProfissional } = req.query;

    if (!data || !idProfissional) {
      return res.status(400).json({ error: 'Data e idProfissional são obrigatórios.' });
    }

    const agendamentos = await buscarAgendamentosPorDataEProfissionalComCliente(data, idProfissional);

    res.status(200).json(agendamentos);
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error);
    res.status(500).json({ error: 'Erro ao buscar agendamentos.' });
  }
};