import { MongoClient } from 'mongodb';
import { CONNECTION_STRING, DATABASE_COLLECTION, DATABASE_NAME } from '../config';

export const connectDatabase = async () => {
  try {
    const connection = await MongoClient.connect(CONNECTION_STRING);
    const db = connection.db(`${DATABASE_NAME}` || 'sequences');

    return db.collection(`${DATABASE_COLLECTION}` || 'subsequences');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Error connecting to the database');
  }
};
