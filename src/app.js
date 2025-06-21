const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');

// MODELS (importados para registro e sync)
require('./models/Cliente');
require('./models/Tecnico');
require('./models/ProdutoServico');
require('./models/OrdemServico');
require('./models/OrdemProdutoServico');

// ROTAS
const clienteRoutes = require('./routes/clienteRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const produtoServicoRoutes = require('./routes/produtoServicoRoutes');
const ordemServicoRoutes = require('./routes/ordemServicoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Teste de conexão e sincronização com banco
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

// ROTAS
app.use('/clientes', clienteRoutes);
app.use('/tecnicos', tecnicoRoutes);
app.use('/produtos-servicos', produtoServicoRoutes);
app.use('/ordens-servico', ordemServicoRoutes);

// ROTA DE TESTE
app.get('/', (req, res) => {
  res.send('API OS SYSTEM funcionando!');
});

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
