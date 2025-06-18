import Carousel from '../components/Carousel'
import { generateDotPositions } from '../utils/randomDots'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const MathModule = ({ start }) => {
  const numbers = Array.from({ length: 10 }, (_, i) => start + i)
  const first = shuffle(numbers.slice(0, 5))
  const slides = [...first, ...numbers.slice(5)]

  return (
    <Carousel
      items={slides}
      renderItem={(n) => {
        const positions = generateDotPositions(n)
        return (
          <div className="relative w-full h-[300px]">
            {positions.map((pos, i) => (
              <span
                key={i}
                className="absolute inline-block w-4 h-4 bg-red-500 rounded-full"
                style={{ top: pos.top, left: pos.left }}
              />
            ))}
          </div>
        )
      }}
    />
  )
}

export default MathModule
