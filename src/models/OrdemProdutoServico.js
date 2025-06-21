const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const OrdemServico = require('./OrdemServico');
const ProdutoServico = require('./ProdutoServico');

const OrdemProdutoServico = sequelize.define('OrdemProdutoServico', {}, {
  tableName: 'ordem_produto_servico'
});

OrdemServico.belongsToMany(ProdutoServico, {
  through: OrdemProdutoServico,
  as: 'produtosServicos',
  foreignKey: 'ordemServicoId'
});

ProdutoServico.belongsToMany(OrdemServico, {
  through: OrdemProdutoServico,
  as: 'ordensServico',
  foreignKey: 'produtoServicoId'
});

module.exports = OrdemProdutoServico;
