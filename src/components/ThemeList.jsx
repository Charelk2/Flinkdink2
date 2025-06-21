import { useContent } from '../contexts/ContentProvider';

const ThemeList = () => {
  const { weekData } = useContent();
  if (!weekData) return null;

  const language = weekData.language[0];
  const mathStart = weekData.mathWindowStart;
  const mathLength = weekData.mathWindowLength ?? 10;
  const knowledge = weekData.encyclopedia[0].title;
  const firstSum = weekData.addition?.[0]?.[0];
  const firstDiff = weekData.subtraction?.[0]?.[0];
  const firstProd = weekData.multiplication?.[0]?.[0];
  const firstQuot = weekData.division?.[0]?.[0];

  let mathText = `${mathStart}–${mathStart + mathLength - 1}`;
  const sumText = firstSum && `${firstSum.a} + ${firstSum.b} = ${firstSum.sum}`;
  const diffText = firstDiff && `${firstDiff.a} - ${firstDiff.b} = ${firstDiff.difference}`;
  const prodText = firstProd && `${firstProd.a} × ${firstProd.b} = ${firstProd.product}`;
  const quotText = firstQuot && `${firstQuot.a} ÷ ${firstQuot.b} = ${firstQuot.quotient}`;

  if (mathLength === 0) {
    mathText = sumText || diffText || prodText || quotText || mathText;
  } else if (sumText || diffText || prodText || quotText) {
    mathText += `, ${sumText || diffText || prodText || quotText}`;
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
