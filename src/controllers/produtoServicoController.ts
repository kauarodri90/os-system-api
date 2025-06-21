import { Request, Response } from 'express';
import ProdutoServico from '../models/ProdutoServico';

const produtoServicoController = {
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const lista = await ProdutoServico.findAll();
      res.json(lista);
    } catch (err: any) {
      res.status(500).json({ erro: 'Erro ao listar', detalhe: err.message });
    }
  },

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const item = await ProdutoServico.create(req.body);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao criar', detalhe: err.message });
    }
  },

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await ProdutoServico.update(req.body, { where: { id } });
      res.json({ mensagem: 'Atualizado com sucesso' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao atualizar', detalhe: err.message });
    }
  },

  async alterarStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await ProdutoServico.update({ status }, { where: { id } });
      res.json({ mensagem: `Status alterado para ${status}` });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao alterar status', detalhe: err.message });
    }
  }
};

export default produtoServicoController;
