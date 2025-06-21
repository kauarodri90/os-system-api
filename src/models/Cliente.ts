import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model<InferAttributes<Cliente>, InferCreationAttributes<Cliente>> {
  declare id: number;
  declare nome: string;
  declare cpfCnpj: string;
  declare email: string;
  declare telefone: string;
  declare endereco?: string;
  declare status: 'ativo' | 'inativo';
}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpfCnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo'),
      defaultValue: 'ativo',
    }
  },
  {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
  }
);


export default Cliente;
