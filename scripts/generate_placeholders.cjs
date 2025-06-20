const fs = require('fs');
const path = require('path');
const weekDir = path.join('public', 'weeks');
// Read all week files dynamically so new weeks are picked up automatically
const weeks = fs
  .readdirSync(weekDir)
  .filter((f) => /^week\d+\.json$/.test(f))
  .sort()
  .map((f) => path.join(weekDir, f));
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
