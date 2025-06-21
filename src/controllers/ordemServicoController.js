const OrdemServico = require('../models/OrdemServico');
const ProdutoServico = require('../models/ProdutoServico');

module.exports = {
  async listar(req, res) {
    const ordens = await OrdemServico.findAll({
      include: ['Cliente', 'Tecnico', {
        model: ProdutoServico,
        as: 'produtosServicos'
      }]
    });
    res.json(ordens);
  },

  async criar(req, res) {
    const { clienteId, tecnicoId, descricaoProblema, produtosServicos } = req.body;
    try {
      const os = await OrdemServico.create({
        clienteId,
        tecnicoId,
        descricaoProblema
      });

      if (produtosServicos && produtosServicos.length > 0) {
        await os.setProdutosServicos(produtosServicos);
      }

      res.status(201).json(os);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao criar OS', detalhe: err.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { descricaoProblema, produtosServicos } = req.body;

    try {
      const os = await OrdemServico.findByPk(id);
      if (!os) return res.status(404).json({ erro: 'OS não encontrada' });

      await os.update({ descricaoProblema });

      if (produtosServicos) {
        await os.setProdutosServicos(produtosServicos);
      }

      res.json({ mensagem: 'OS atualizada' });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao atualizar OS', detalhe: err.message });
    }
  },

  async finalizar(req, res) {
    const { id } = req.params;
    try {
      const os = await OrdemServico.findByPk(id);
      await os.update({ status: 'finalizada', dataTermino: new Date() });
      res.json({ mensagem: 'OS finalizada com sucesso' });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao finalizar OS' });
    }
  },

  async cancelar(req, res) {
    const { id } = req.params;
    try {
      const os = await OrdemServico.findByPk(id);
      await os.update({ status: 'cancelada' });
      res.json({ mensagem: 'OS cancelada com sucesso' });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao cancelar OS' });
    }
  }
};
