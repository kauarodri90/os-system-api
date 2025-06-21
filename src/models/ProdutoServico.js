const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProdutoServico = sequelize.define('ProdutoServico', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('produto', 'serviço'),
    allowNull: false,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    defaultValue: 'ativo',
  }
}, {
  tableName: 'produtos_servicos',
});

module.exports = ProdutoServico;
