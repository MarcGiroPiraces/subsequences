export const generateSubsequences = (sequence: number[]): number[][] => {
  const subsequences: number[][] = [[]];
  const sequenceSet = new Set(sequence);

  for (const num of sequenceSet) {
    const currentLength = subsequences.length;
    for (let j = 0; j < currentLength; j++) {
      const subsequence = [...subsequences[j], num];
      subsequences.push(subsequence);
    }
  }

  return subsequences.slice(1);
};
