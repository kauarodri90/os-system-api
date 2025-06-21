const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Tecnico = sequelize.define('Tecnico', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    defaultValue: 'ativo',
  }
}, {
  tableName: 'tecnicos',
  hooks: {
    beforeCreate: async (tecnico) => {
      tecnico.senha = await bcrypt.hash(tecnico.senha, 10);
    },
    beforeUpdate: async (tecnico) => {
      if (tecnico.changed('senha')) {
        tecnico.senha = await bcrypt.hash(tecnico.senha, 10);
      }
    }
  }
});

module.exports = Tecnico;
