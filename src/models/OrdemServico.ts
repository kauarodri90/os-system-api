import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import sequelize from '../config/database';
import Cliente from './Cliente';
import Tecnico from './Tecnico';

class OrdemServico extends Model<
  InferAttributes<OrdemServico>,
  InferCreationAttributes<OrdemServico>
> {
  declare id: CreationOptional<number>;
  declare descricaoProblema: string;
  declare status: 'aberta' | 'em_andamento' | 'finalizada' | 'cancelada';
  declare dataAbertura: Date;
  declare dataTermino: Date | null;
  declare ClienteId: number;
  declare TecnicoId: number;
}

OrdemServico.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    },
    ClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id',
      },
    },
    TecnicoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tecnicos',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'OrdemServico',
    tableName: 'ordens_servico',
  }
);

// Associações
Cliente.hasMany(OrdemServico, {
  foreignKey: 'ClienteId',
});
OrdemServico.belongsTo(Cliente, {
  foreignKey: 'ClienteId',
});

Tecnico.hasMany(OrdemServico, {
  foreignKey: 'TecnicoId',
});
OrdemServico.belongsTo(Tecnico, {
  foreignKey: 'TecnicoId',
});

export default OrdemServico;
