//* Generate random number
export async function generateRandomNumbers(): Promise<number> {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
