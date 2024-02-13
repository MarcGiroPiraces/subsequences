export const generateSequence = (subSequence: number[][]): number[] => {
  return [...subSequence].filter((subSequenceElement) => subSequenceElement.length === 1).flat();
};
