import { sortSequence } from './sortSequence';

describe('Given a sortSequence function', () => {
  describe('When it is called with a sequence of numbers', () => {
    it('should return a sorted array of numbers', () => {
      const sequence = [3, 1, 2];
      const expectedSequence = [1, 2, 3];

      const result = sortSequence(sequence);

      expect(result).toEqual(expectedSequence);
    });
  });

  describe('When it is called with a sequence of numbers with duplicates', () => {
    it('should return a sorted array of numbers with the duplicates', () => {
      const sequence = [3, 1, 2, 1, 2];
      const expectedSequence = [1, 1, 2, 2, 3];

      const result = sortSequence(sequence);

      expect(result).toEqual(expectedSequence);
    });
  });

  describe('When it is called with an empty array', () => {
    it('should return an empty array', () => {
      const sequence: number[] = [];

      const result = sortSequence(sequence);

      expect(result).toEqual([]);
    });
  });
});
