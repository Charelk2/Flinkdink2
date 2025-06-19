const fs = require('fs');
const path = require('path');
const weeks = ['public/weeks/week001.json', 'public/weeks/week002.json'];
const outDir = 'src/assets/encyclopedia';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const slugs = new Map();
for (const file of weeks) {
  const data = JSON.parse(fs.readFileSync(file));
  data.encyclopedia.forEach(({ id, title }) => {
    if (!slugs.has(id)) slugs.set(id, title);
  });
}
for (const [slug, title] of slugs.entries()) {
  const filePath = path.join(outDir, `${slug}.svg`);
  if (fs.existsSync(filePath)) continue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="100%" height="100%" fill="#ddd"/><text x="50%" y="50%" text-anchor="middle" fill="#555" font-size="48" dy=".3em">${title}</text></svg>`;
  fs.writeFileSync(filePath, svg);
  console.log('created', filePath);
}
