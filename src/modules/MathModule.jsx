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
