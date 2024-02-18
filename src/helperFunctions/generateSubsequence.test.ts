import { generateSubsequences } from './generateSubsequences';

describe('Given a generateSubsequence function', () => {
  describe('When it is called with an array of numbers', () => {
    it('should return an array of subsequences of a given sequence', () => {
      const sequence = [1, 2, 3];
      const expectedSubsequence = [[1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];

      const subsequence = generateSubsequences(sequence);

      expect(subsequence).toEqual(expectedSubsequence);
    });
  });

  describe('When it is called with an array of numbers with duplicates', () => {
    it('should return an array of subsequences without the duplicates', () => {
      const sequence = [1, 2, 2];
      const expectedSubsequence = [[1], [2], [1, 2]];

      const subsequence = generateSubsequences(sequence);

      expect(subsequence).toEqual(expectedSubsequence);
    });
  });

  describe('When it is called with an empty array', () => {
    it('should return an empty array', () => {
      const sequence: number[] = [];

      const subsequence = generateSubsequences(sequence);

      expect(subsequence).toEqual([]);
    });
  });
});
