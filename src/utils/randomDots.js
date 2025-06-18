export const MIN_DISTANCE = 8;

/**
 * Generate random top/left percentages for a group of dots. Each new dot is
 * required to be at least `minDist` percent away from all previous dots using
 * Euclidean distance. The function retries until enough valid positions are
 * found or a safety cap of `count * 50` attempts is reached.
 */
export const generateDotPositions = (count, minDist = MIN_DISTANCE) => {
  const randomValue = () => 10 + Math.random() * 80;
  const positions = [];
  let attempts = 0;
  const maxAttempts = count * 50;

  while (positions.length < count && attempts < maxAttempts) {
    attempts += 1;
    const candidate = { top: randomValue(), left: randomValue() };
    const valid = positions.every((p) => {
      const dx = p.left - candidate.left;
      const dy = p.top - candidate.top;
      return Math.hypot(dx, dy) >= minDist;
    });
    if (valid) {
      positions.push(candidate);
    }
  }

  return positions.map(({ top, left }) => ({
    top: `${top}%`,
    left: `${left}%`,
  }));
};
