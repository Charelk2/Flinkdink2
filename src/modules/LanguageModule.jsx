import Carousel from '../components/Carousel'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const LanguageModule = ({ words }) => {
  const items = shuffle(words)

  const fontSizeForWord = (word) => {
    const maxSize = 20 // vw
    const size = Math.min(maxSize, 100 / Math.max(word.length, 1))
    return `${size}vw`
  }

  return (
    <Carousel
      items={items}
      renderItem={(word) => (
        <div
          className="language-word font-bold lowercase leading-none"
          style={{ fontSize: fontSizeForWord(word) }}
        >
          {word}
        </div>
      )}
    />
  )
}

export default LanguageModule
