import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

export const generateJwtToken = (): string => {
  const expiration = Math.floor(Date.now() / 1000) + 600;
  const token = jwt.sign(
    {
      exp: expiration,
    },
    SECRET_KEY,
  );

  return token;
};
