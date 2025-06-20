import { useContent } from '../contexts/ContentProvider';

const ThemeList = () => {
  const { weekData } = useContent();
  if (!weekData) return null;

  const language = weekData.language[0];
  const mathStart = weekData.mathWindowStart;
  const mathLength = weekData.mathWindowLength || 10;
  const knowledge = weekData.encyclopedia[0].title;

  return (
    <ul className="list-none px-4 md:px-0 space-y-1 text-gray-700">
      <li>📝 Language: {language}…</li>
      <li>🔢 Math Dots: {mathStart}–{mathStart + mathLength - 1}</li>
      <li>🦁 Knowledge: {knowledge}…</li>
    </ul>
  );
};

export default ThemeList;
