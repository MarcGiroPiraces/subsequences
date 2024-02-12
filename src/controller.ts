import { Request, Response } from 'express';
import { WithId } from 'mongodb';
import { generateJwtToken } from './auth/generateJwtToken';
import { connectDatabase } from './database/database';
import { generateSubsequences } from './helperFunctios/generateSubsequences';

export const insertSequences = async (req: Request, res: Response) => {
  try {
    const collection = await connectDatabase();

    const sequence: [] = req.body.sequence;
    const subsequences = generateSubsequences(sequence);
    const insertObject = { subsequences: subsequences, createdAt: new Date() };

    await collection.insertOne(insertObject);

    res.send(subsequences);
  } catch (error) {
    res.status(500).send('Error inserting sequences');
  }
};

export const getSequences = async (req: Request, res: Response) => {
  try {
    const collection = await connectDatabase();
    const sequences = (await collection.find({}).toArray()) as WithId<{ subsequences: [] }>[];

    const sequencesOrderedByLength = sequences.sort((a, b) => {
      return a.subsequences.length - b.subsequences.length;
    });

    res.send({ subsequences: sequencesOrderedByLength });
  } catch (error) {
    res.status(500).send('Error getting sequences');
  }
};

export const getToken = (req: Request, res: Response) => {
  try {
    const token = generateJwtToken();

    res.send(token);
  } catch (error) {
    res.status(500).send('Error generating token');
  }
};
