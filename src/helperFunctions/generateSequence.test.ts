import { generateSequence } from './generateSequence';

describe('Given a generateSequence function', () => {
  describe('When it is called with a subSequence', () => {
    it('should return a flat array of numbers from subSequence', () => {
      const subSequence: number[][] = [[1], [2], [1, 2]];

      const result = generateSequence(subSequence);

      expect(result).toEqual([1, 2]);
    });

    it('should return a flat array of numbers from subSequence', () => {
      const subSequence: number[][] = [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]];

      const result = generateSequence(subSequence);

      expect(result).toEqual([1, 2, 3]);
    });

    it('should return an empty array if subSequence is empty', () => {
      const subSequence: number[][] = [];

      const result = generateSequence(subSequence);

      expect(result).toEqual([]);
    });

    it('should return an empty array if subSequence has no single-element arrays', () => {
      const subSequence: number[][] = [
        [1, 2],
        [3, 4],
        [5, 6],
      ];

      const result = generateSequence(subSequence);

      expect(result).toEqual([]);
    });
  });
});
