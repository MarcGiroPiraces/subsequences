import { NextFunction, Request, Response } from 'express';
import { verifyJwtToken } from '../auth/verifyJwtToken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    return res.status(401).send('Access Denied');
  }
  try {
    const token = authorizationHeader.split(' ')[1];
    const verified = verifyJwtToken(token);
    if (!verified) {
      return res.status(401).send('Invalid Token');
    }
    next();
  } catch (err) {
    res.status(401).send('Invalid Token');
  }
};
