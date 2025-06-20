import Carousel from '../components/Carousel'
import { generateDotPositions } from '../utils/randomDots'

const DotBoard = ({ count }) => {
  const positions = generateDotPositions(count)
  return (
    <div className="relative w-full h-[60vw] sm:h-[40vh]">
      <span
        data-testid="dot-count"
        className="absolute top-0 right-0 m-1 text-[10px] text-black"
      >
        {count}
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
}

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

const MathModule = ({ start, length = 10, shuffleFirstHalf, sum, difference }) => {
  const numberSlides = createSlides(start, length, shuffleFirstHalf)
  const additionSlides = sum ? [sum.a, sum.b, sum.sum] : []
  const subtractionSlides = difference ? [difference.a, difference.b, difference.difference] : []
  const slides = [...numberSlides, ...additionSlides, ...subtractionSlides]

  return (
    <div className="space-y-4 text-center">
      <Carousel
        items={slides}
        renderItem={(n) => <DotBoard count={n} />}
      />
      {sum && (
        <div className="text-lg font-semibold">
          {sum.a} + {sum.b} = {sum.sum}
        </div>
      )}
      {difference && (
        <div className="text-lg font-semibold">
          {difference.a} - {difference.b} = {difference.difference}
        </div>
      )}
    </div>
  )
}

export default MathModule
