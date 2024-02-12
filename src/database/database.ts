import { MongoClient } from 'mongodb';
import { CONNECTION_STRING } from '../config';

export const connectDatabase = async () => {
  try {
    const connection = await MongoClient.connect(CONNECTION_STRING);
    const db = connection.db('subsequences');

    return db.collection('sequences');
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Error connecting to the database');
  }
};
