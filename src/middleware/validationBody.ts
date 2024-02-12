import { NextFunction, Request, Response } from 'express';

export const validateSequence = (req: Request, res: Response, next: NextFunction) => {
  const sequence = req.body.sequence;
  if (!sequence || !Array.isArray(sequence)) {
    return res.status(400).send('Invalid sequence');
  }
  next();
};
