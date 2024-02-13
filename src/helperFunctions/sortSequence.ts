export const sortSequence = (sequence: number[]): number[] => {
  return [...sequence].sort((a, b) => a - b);
};
