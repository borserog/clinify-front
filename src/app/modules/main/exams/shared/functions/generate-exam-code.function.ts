// TODO move logic to a backend service
export function generateExamCode(): string {
  const asciiUppercase = Array.from({ length: 25}, (_, i) => i + 65);
  const asciiNumbers = Array.from({ length: 9}, (_, i) => i + 48);
  const result = [];

  for (let i = 0; i < 7; i++) {
    if (i <= 4) {
      result.push(asciiUppercase[Math.floor(Math.random() * asciiUppercase.length)]);
    } else {
      result.push(asciiNumbers[Math.floor(Math.random() * asciiNumbers.length)]);
    }
  }

  return String.fromCharCode(...result);
}
