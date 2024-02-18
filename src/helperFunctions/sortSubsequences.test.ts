import { sortSubsequences } from './sortSubsequences';

describe('Given a sortSubsequences function', () => {
  describe('When it is called with an array of subsequences', () => {
    it('should return an array of subsequences sorted by length', () => {
      const subsequences = [[1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]];
      const expectedSubsequences = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];

      const result = sortSubsequences(subsequences);

      expect(result).toEqual(expectedSubsequences);
    });
  });

  describe('When it is called with an array of subsequences with duplicates', () => {
    it('should return an array of subsequences sorted by length', () => {
      const subsequences = [[1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3], [1, 2], [1, 2, 3]];
      const expectedSubsequences = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2], [1, 2, 3], [1, 2, 3]];

      const result = sortSubsequences(subsequences);

      expect(result).toEqual(expectedSubsequences);
    });
  });

  describe('When it is called with an empty array', () => {
    it('should return an empty array', () => {
      const subsequences: number[][] = [];

      const result = sortSubsequences(subsequences);

      expect(result).toEqual([]);
    });
  });
});
