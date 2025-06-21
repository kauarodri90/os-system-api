import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

interface TecnicoAttributes {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  status: 'ativo' | 'inativo';
}

type TecnicoCreationAttributes = Optional<TecnicoAttributes, 'id' | 'status'>;

class Tecnico extends Model<TecnicoAttributes, TecnicoCreationAttributes> implements TecnicoAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public telefone!: string;
  public senha!: string;
  public status!: 'ativo' | 'inativo';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tecnico.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    defaultValue: 'ativo'
  }
}, {
  sequelize,
  modelName: 'Tecnico',
  tableName: 'tecnicos',
  hooks: {
    beforeCreate: async (tecnico: Tecnico) => {
      tecnico.senha = await bcrypt.hash(tecnico.senha, 10);
    },
    beforeUpdate: async (tecnico: Tecnico) => {
      if (tecnico.changed('senha')) {
        tecnico.senha = await bcrypt.hash(tecnico.senha, 10);
      }
    }
  }
});

export default Tecnico;
