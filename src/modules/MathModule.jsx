import Carousel from '../components/Carousel'
import { generateDotPositions } from '../utils/randomDots'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// eslint-disable-next-line react-refresh/only-export-components
export const createSlides = (start) => {
  const numbers = Array.from({ length: 10 }, (_, i) => start + i)
  const firstHalf = numbers.slice(0, 5)
  const secondHalf = numbers.slice(5)
  const first = start === 1 ? firstHalf : shuffle(firstHalf)
  return [...first, ...secondHalf]
}

const MathModule = ({ start }) => {
  const slides = createSlides(start)

  return (
    <Carousel
      items={slides}
      renderItem={(n) => {
        const positions = generateDotPositions(n)
        return (
          <div className="relative w-full h-[60vw] sm:h-[300px]">
            {positions.map((pos, i) => (
              <span
                key={i}
                className="absolute inline-block"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '9999px',
                  backgroundColor: '#ef4444',
                }}
              />
            ))}
          </div>
        )
      }}
    />
  )
}

export default MathModule
