import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../config/database';

class ProdutoServico extends Model<
  InferAttributes<ProdutoServico>,
  InferCreationAttributes<ProdutoServico>
> {
  declare id: number;
  declare descricao: string;
  declare tipo: 'produto' | 'serviço';
  declare valor: number;
  declare status: 'ativo' | 'inativo';
}

ProdutoServico.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
  },
  {
    sequelize,
    modelName: 'ProdutoServico',
    tableName: 'produtos_servicos',
  }
);

export default ProdutoServico;
