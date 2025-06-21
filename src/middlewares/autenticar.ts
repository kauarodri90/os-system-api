import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function autenticar(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ erro: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    (req as any).userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}
