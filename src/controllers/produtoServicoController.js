const ProdutoServico = require('../models/ProdutoServico');

module.exports = {
  async listar(req, res) {
    const lista = await ProdutoServico.findAll();
    res.json(lista);
  },

  async criar(req, res) {
    const item = await ProdutoServico.create(req.body);
    res.status(201).json(item);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    await ProdutoServico.update(req.body, { where: { id } });
    res.json({ mensagem: 'Atualizado com sucesso' });
  },

  async alterarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    await ProdutoServico.update({ status }, { where: { id } });
    res.json({ mensagem: `Status alterado para ${status}` });
  }
};
