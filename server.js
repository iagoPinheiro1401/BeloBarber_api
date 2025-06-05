import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clienteRoutes.js';
import profissionalRoutes from './routes/profissionalRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import servicoRoutes from './routes/servicoRoutes.js';
import relatorioRoutes from './routes/relatorioRoutes.js';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
export const jwtSecret = process.env.JWT_SECRET;

app.use(cors({
  origin: 'http://localhost:3000',
}));


app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use('/profissionais', profissionalRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/auth', authRoutes);
app.use('/servicos', servicoRoutes);
app.use("/relatorio", relatorioRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
