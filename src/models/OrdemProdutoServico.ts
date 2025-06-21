import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import OrdemServico from './OrdemServico';
import ProdutoServico from './ProdutoServico';

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

export default OrdemProdutoServico;
