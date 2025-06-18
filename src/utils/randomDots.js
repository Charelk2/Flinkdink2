export const generateDotPositions = (count) => {
  const randomPercent = () => `${10 + Math.random() * 80}%`;
  return Array.from({ length: count }, () => ({
    top: randomPercent(),
    left: randomPercent(),
  }));
};
