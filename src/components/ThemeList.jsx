const ThemeList = ({ languageTheme, mathRange, knowledgeTheme }) => (
  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside text-left">
    {languageTheme && <li>{languageTheme}</li>}
    {mathRange && <li>{mathRange}</li>}
    {knowledgeTheme && <li>{knowledgeTheme}</li>}
  </ul>
)

export default ThemeList
