const Cliente = require('../models/Cliente');

module.exports = {
  async listar(req, res) {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar clientes', detalhe: err.message });
    }
  },

  async criar(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao criar cliente', detalhe: err.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    try {
      await Cliente.update(req.body, { where: { id } });
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhe: err.message });
    }
  },

  async alterarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await Cliente.update({ status }, { where: { id } });
      res.json({ mensagem: `Status alterado para ${status}` });
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao alterar status', detalhe: err.message });
    }
  }
};
