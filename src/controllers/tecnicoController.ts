import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Tecnico from '../models/Tecnico';

const tecnicoController = {
  async login(req: Request, res: Response): Promise<void> {
    const { email, senha } = req.body;

    try {
      const tecnico = await Tecnico.findOne({ where: { email } });

      if (!tecnico || tecnico.status !== 'ativo') {
        res.status(401).json({ erro: 'Credenciais inválidas ou usuário inativo' });
        return;
      }

      const senhaValida = await bcrypt.compare(senha, tecnico.senha);
      if (!senhaValida) {
        res.status(401).json({ erro: 'Credenciais inválidas' });
        return;
      }

      const token = jwt.sign({ id: tecnico.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
      });

      res.json({
        token,
        tecnico: { id: tecnico.id, nome: tecnico.nome, email: tecnico.email },
      });
    } catch (err: any) {
      res.status(500).json({ erro: 'Erro no login', detalhe: err.message });
    }
  },

  async listar(req: Request, res: Response): Promise<void> {
    try {
      const tecnicos = await Tecnico.findAll();
      res.json(tecnicos);
    } catch (err: any) {
      res.status(500).json({ erro: 'Erro ao listar técnicos', detalhe: err.message });
    }
  },

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const novo = await Tecnico.create(req.body);
      res.status(201).json(novo);
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao criar técnico', detalhe: err.message });
    }
  },

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await Tecnico.update(req.body, { where: { id } });
      res.json({ mensagem: 'Atualizado com sucesso' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao atualizar técnico', detalhe: err.message });
    }
  },

  async alterarStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await Tecnico.update({ status }, { where: { id } });
      res.json({ mensagem: `Status alterado para ${status}` });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao alterar status', detalhe: err.message });
    }
  }
};

export default tecnicoController;
