import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from '../auth/verifyJwtToken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = verifyJwtToken(token);
    if (!verified) {
      return res.status(401).send('Invalid Token');
    }
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};
