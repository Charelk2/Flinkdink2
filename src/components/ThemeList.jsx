import { useContent } from '../contexts/ContentProvider'

const ThemeList = () => {
  const { weekData } = useContent()
  if (!weekData) return null
  const language = weekData.language?.[0]
  const mathRange = `${weekData.mathWindowStart}–${weekData.mathWindowStart + 9}`
  const knowledge = weekData.encyclopedia?.[0]?.title

  return (
    <ul className="text-gray-700 space-y-1 px-6 list-disc">
      <li>📝 Language: {language}…</li>
      <li>🔢 Math Dots: {mathRange}</li>
      <li>🦁 Knowledge: {knowledge}…</li>
    </ul>
  )
}

export default ThemeList
