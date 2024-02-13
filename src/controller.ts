import { Request, Response } from 'express';
import { WithId } from 'mongodb';
import { generateJwtToken } from './auth/generateJwtToken';
import { connectDatabase } from './database/database';
import { generateSubsequences } from './helperFunctions/generateSubsequences';
import { sortSequence } from './helperFunctions/sortSequence';
import { sortSubsequences } from './helperFunctions/sortSubsequences';

export const insertSequences = async (req: Request, res: Response) => {
  try {
    const collection = await connectDatabase();

    const sequence: [] = req.body.sequence;
    const sortedSequence = sortSequence(sequence);
    const subsequences = generateSubsequences(sortedSequence);
    const sortedSubsequences = sortSubsequences(subsequences);
    const insertObject = { subsequences: sortedSubsequences, createdAt: new Date() };

    await collection.insertOne(insertObject);

    res.send(subsequences);
  } catch (error) {
    res.status(500).send('Error inserting sequences');
  }
};

export const getSequences = async (req: Request, res: Response) => {
  try {
    const collection = await connectDatabase();
    const subSequences = (await collection.find({}).sort({ createdAt: -1 }).limit(10).toArray()) as WithId<{
      subsequences: [];
    }>[];

    const response = subSequences.map((subsequence) => {
      const sequence = [1, 2];
      const subSequences = subsequence.subsequences;

      return {
        sequence,
        subSequences,
      };
    });

    res.send(response);
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
