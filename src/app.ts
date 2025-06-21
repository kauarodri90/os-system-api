import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config(); // ✅ Carrega as variáveis de ambiente antes de qualquer uso

const app = express(); // ✅ Cria o app antes de usar

app.use(cors());
app.use(express.json());

// Importação de models apenas para registrar no Sequelize
import './models/Cliente';
import './models/Tecnico';
import './models/ProdutoServico';
import './models/OrdemServico';
import './models/OrdemProdutoServico';

// Importação das rotas
import clienteRoutes from './routes/clienteRoutes';
import tecnicoRoutes from './routes/tecnicoRoutes';
import produtoServicoRoutes from './routes/produtoServicoRoutes';
import ordemServicoRoutes from './routes/ordemServicoRoutes';

// Conexão com o banco e sincronização
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Banco sincronizado com os models');
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/produtos-servicos', produtoServicoRoutes);
app.use('/ordens-servico', ordemServicoRoutes);

// Rota de teste
app.get('/', (_req, res) => {
  res.send('API OS SYSTEM funcionando!');
});

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
