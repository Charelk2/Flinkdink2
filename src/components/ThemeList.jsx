import { useContent } from '../contexts/ContentProvider';

const ThemeList = () => {
  const { weekData } = useContent();
  if (!weekData) return null;

  const language = weekData.language[0];
  const mathStart = weekData.mathWindowStart;
  const mathLength = weekData.mathWindowLength ?? 10;
  const knowledge = weekData.encyclopedia[0].title;
  const firstSum = weekData.addition?.[0]?.[0];

  let mathText = `${mathStart}–${mathStart + mathLength - 1}`;
  if (mathLength === 0 && firstSum) {
    mathText = `${firstSum.a} + ${firstSum.b} = ${firstSum.sum}`;
  } else if (mathLength > 0 && firstSum) {
    mathText += `, ${firstSum.a} + ${firstSum.b} = ${firstSum.sum}`;
  }

  return (
    <ul className="list-none px-4 md:px-0 space-y-1 text-gray-700">
      <li>📝 Language: {language}…</li>
      <li>🔢 Math: {mathText}</li>
      <li>🦁 Knowledge: {knowledge}…</li>
    </ul>
  );
};

export default ThemeList;
