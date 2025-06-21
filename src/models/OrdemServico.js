const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cliente = require('./Cliente');
const Tecnico = require('./Tecnico');

const OrdemServico = sequelize.define('OrdemServico', {
  descricaoProblema: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('aberta', 'em_andamento', 'finalizada', 'cancelada'),
    defaultValue: 'aberta',
  },
  dataAbertura: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  dataTermino: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'ordens_servico',
});

Cliente.hasMany(OrdemServico);
OrdemServico.belongsTo(Cliente);

Tecnico.hasMany(OrdemServico);
OrdemServico.belongsTo(Tecnico);

module.exports = OrdemServico;
