import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

export const verifyJwtToken = (token: string): JwtPayload | null => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};
