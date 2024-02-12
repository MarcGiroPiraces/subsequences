export const generateSubsequences = (sequence: number[]): number[][] => {
  const subsequences: number[][] = [[]];

  for (const num of sequence) {
    const currentLength = subsequences.length;
    for (let j = 0; j < currentLength; j++) {
      const subsequence = [...subsequences[j], num];
      subsequences.push(subsequence);
    }
  }

  return subsequences.slice(1);
};
