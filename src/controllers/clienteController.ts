import { Request, Response } from 'express';
import Cliente from '../models/Cliente';

const clienteController = {
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const clientes = await Cliente.findAll();
      res.json(clientes);
    } catch (err: any) {
      res.status(500).json({ erro: 'Erro ao listar clientes', detalhe: err.message });
    }
  },

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao criar cliente', detalhe: err.message });
    }
  },

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await Cliente.update(req.body, { where: { id } });
      res.json({ mensagem: 'Cliente atualizado com sucesso' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao atualizar cliente', detalhe: err.message });
    }
  },

  async alterarStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await Cliente.update({ status }, { where: { id } });
      res.json({ mensagem: `Status alterado para ${status}` });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao alterar status', detalhe: err.message });
    }
  }
};

export default clienteController;
