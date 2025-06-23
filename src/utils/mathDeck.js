export function generateDotDeck(start = 1) {
  const cards = [];
  for (let i = start; i < start + 10; i++) {
    cards.push({
      number: i,
      dots: Array(i).fill(true) // just a placeholder — we'll render \`i\` red dots
    });
  }
  return cards;
}
