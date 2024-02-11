import { MongoClient } from 'mongodb';
import { CONNECTION_STRING } from '../config';

export const connectDatabase = async () => {
  try {
    return await MongoClient.connect(CONNECTION_STRING);
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw new Error('Error connecting to the database');
  }
};
