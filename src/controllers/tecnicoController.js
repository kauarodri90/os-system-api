const Tecnico = require('../models/Tecnico');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { email, senha } = req.body;

    const tecnico = await Tecnico.findOne({ where: { email } });
    if (!tecnico || tecnico.status !== 'ativo') {
      return res.status(401).json({ erro: 'Credenciais inválidas ou usuário inativo' });
    }

    const senhaValida = await bcrypt.compare(senha, tecnico.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: tecnico.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, tecnico: { id: tecnico.id, nome: tecnico.nome, email: tecnico.email } });
  },

  async listar(req, res) {
    const tecnicos = await Tecnico.findAll();
    res.json(tecnicos);
  },

  async criar(req, res) {
    const novo = await Tecnico.create(req.body);
    res.status(201).json(novo);
  },

  async atualizar(req, res) {
    const { id } = req.params;
    await Tecnico.update(req.body, { where: { id } });
    res.json({ mensagem: 'Atualizado com sucesso' });
  },

  async alterarStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    await Tecnico.update({ status }, { where: { id } });
    res.json({ mensagem: `Status alterado para ${status}` });
  }
};
