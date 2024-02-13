export const sortSubsequences = (subsequences: number[][]): number[][] => {
  return subsequences.sort((a, b) => {
    return a.length - b.length;
  });
};
