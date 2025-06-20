import Carousel from '../components/Carousel'
import { generateDotPositions } from '../utils/randomDots'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// eslint-disable-next-line react-refresh/only-export-components
export const createSlides = (
  start,
  length = 10,
  shuffleFirstHalf = start !== 1,
) => {
  const numbers = Array.from({ length }, (_, i) => start + i)
  const firstHalfCount = Math.min(5, numbers.length)
  const firstHalf = numbers.slice(0, firstHalfCount)
  const secondHalf = numbers.slice(firstHalfCount)
  const first = shuffleFirstHalf ? shuffle(firstHalf) : firstHalf
  return [...first, ...secondHalf]
}

const MathModule = ({ start, length = 10, shuffleFirstHalf }) => {
  const slides = createSlides(start, length, shuffleFirstHalf)

  return (
    <Carousel
      items={slides}
      renderItem={(n) => {
        const positions = generateDotPositions(n)
        return (
          <div className="relative w-full h-[60vw] sm:h-[40vh]">
            <span
              data-testid="dot-count"
              className="absolute top-0 right-0 m-1 text-[10px] text-black"
            >
              {n}
            </span>
            {positions.map((pos, i) => (
              <span
                key={i}
                className="absolute inline-block rounded-full"
                style={{
                  width: '1rem',
                  height: '1rem',
                  top: pos.top,
                  left: pos.left,
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
