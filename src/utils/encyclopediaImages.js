
const modules = import.meta.glob('../assets/encyclopedia/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const images = {};
Object.entries(modules).forEach(([path, url]) => {
  const file = path.split('/').pop();
  const name = file.replace(/\.[^.]+$/, '');
  const slug = name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
  images[slug] = url;
});
export default images;
