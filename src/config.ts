import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PORT = process.env.PORT || 8000;
export const CONNECTION_STRING = process.env.CONNECTION_STRING as string;
export const SECRET_KEY = process.env.SECRET_KEY as string;
export const DATABASE_NAME = process.env.DATABASE_NAME as string;
export const DATABASE_COLLECTION = process.env.DATABASE_COLLECTION as string;
