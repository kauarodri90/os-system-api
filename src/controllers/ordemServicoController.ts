import { Request, Response } from 'express';
import OrdemServico from '../models/OrdemServico';
import ProdutoServico from '../models/ProdutoServico';

const ordemServicoController = {
  async listar(req: Request, res: Response): Promise<void> {
    try {
      const ordens = await OrdemServico.findAll({
        include: ['Cliente', 'Tecnico', {
          model: ProdutoServico,
          as: 'produtosServicos'
        }]
      });
      res.json(ordens);
    } catch (err: any) {
      res.status(500).json({ erro: 'Erro ao listar OS', detalhe: err.message });
    }
  },

  async criar(req: Request, res: Response): Promise<void> {
    const { clienteId, tecnicoId, descricaoProblema, produtosServicos } = req.body;
    try {
      const os = await OrdemServico.create({
        ClienteId: clienteId,
        TecnicoId: tecnicoId,
        descricaoProblema,
        status: 'aberta',
        dataAbertura: new Date(),
      });

      if (produtosServicos && produtosServicos.length > 0) {
        // @ts-expect-error: método será adicionado pela associação
        await os.setProdutosServicos(produtosServicos);
      }

      res.status(201).json(os);
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao criar OS', detalhe: err.message });
    }
  },

  async atualizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { descricaoProblema, produtosServicos } = req.body;

    try {
      const os = await OrdemServico.findByPk(id);
      if (!os) {
        res.status(404).json({ erro: 'OS não encontrada' });
        return;
      }

      await os.update({ descricaoProblema });

      if (produtosServicos) {
        // @ts-expect-error: método será adicionado pela associação
        await os.setProdutosServicos(produtosServicos);
      }

      res.json({ mensagem: 'OS atualizada' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao atualizar OS', detalhe: err.message });
    }
  },

  async finalizar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const os = await OrdemServico.findByPk(id);
      if (!os) {
        res.status(404).json({ erro: 'OS não encontrada' });
        return;
      }

      await os.update({ status: 'finalizada', dataTermino: new Date() });
      res.json({ mensagem: 'OS finalizada com sucesso' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao finalizar OS', detalhe: err.message });
    }
  },

  async cancelar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const os = await OrdemServico.findByPk(id);
      if (!os) {
        res.status(404).json({ erro: 'OS não encontrada' });
        return;
      }

      await os.update({ status: 'cancelada' });
      res.json({ mensagem: 'OS cancelada com sucesso' });
    } catch (err: any) {
      res.status(400).json({ erro: 'Erro ao cancelar OS', detalhe: err.message });
    }
  }
};

export default ordemServicoController;
