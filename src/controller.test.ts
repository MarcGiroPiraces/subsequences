import { Request, Response } from 'express';
import { generateJwtToken } from './auth/generateJwtToken';
import { getSequences, getToken, insertSequences } from './controller';
import { connectDatabase } from './database/database';

jest.mock('./database/database');
jest.mock('./auth/generateJwtToken');

describe('Given some express controllers', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
  });

  describe('Given an insertSequences controller', () => {
    it('should insert the subsequences generated from the given sequence.', async () => {
      const sequence = [1, 3, 2];
      const subsequences = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];
      req.body = { sequence };

      const insertOneMock = jest.fn().mockResolvedValueOnce(true);
      (connectDatabase as jest.Mock).mockResolvedValueOnce({ insertOne: insertOneMock });

      await insertSequences(req as Request, res as Response);

      expect(res.send).toHaveBeenCalledWith(subsequences);
    });

    it('should handle errors', async () => {
      (connectDatabase as jest.Mock).mockRejectedValueOnce(new Error('Error connecting to the database'));

      await insertSequences(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error inserting sequences');
    });
  });

  describe('Given a getSequences controller', () => {
    it('should return the last 10 subsequences and their original sequences.', async () => {
      const sequence = [1, 2, 3];
      const subsequences = [{ subsequences: [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]] }];
      (connectDatabase as jest.Mock).mockResolvedValueOnce({
        find: jest.fn().mockReturnValueOnce({
          sort: jest.fn().mockReturnValueOnce({
            limit: jest.fn().mockReturnValueOnce({ toArray: jest.fn().mockResolvedValueOnce(subsequences) }),
          }),
        }),
      });
      const expectedResult = [
        {
          sequence: sequence,
          subSequences: subsequences[0].subsequences,
        },
      ];

      await getSequences(req as Request, res as Response);

      expect(res.send).toHaveBeenCalledWith(expectedResult);
    });

    it('should handle errors', async () => {
      (connectDatabase as jest.Mock).mockRejectedValueOnce(new Error('Database connection error'));

      await getSequences(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error getting sequences');
    });
  });

  describe('Given a getToken controller', () => {
    it('should generate a token and return it', () => {
      const fakeToken = 'fakeToken';
      (generateJwtToken as jest.Mock).mockReturnValueOnce(fakeToken);

      getToken(req as Request, res as Response);

      expect(res.send).toHaveBeenCalledWith(fakeToken);
    });

    it('should handle errors', () => {
      (generateJwtToken as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Token generation error');
      });

      getToken(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error generating token');
    });
  });
});
