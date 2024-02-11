import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PORT = process.env.PORT || 8000;
export const CONNECTION_STRING = process.env.CONNECTION_STRING as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
