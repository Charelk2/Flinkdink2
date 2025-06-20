import Carousel from '../components/Carousel'
import { generateDotPositions } from '../utils/randomDots'

const DotBoard = ({ count }) => {
  const positions = generateDotPositions(count)
  return (
    <div className="relative w-full h-[60vw] sm:h-[40vh]">
      <span data-testid="dot-count" className="absolute top-0 right-0 m-1 text-[10px] text-black">
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

const AdditionModule = ({ sum }) => {
  if (!sum) return null
  const { a, b, sum: result } = sum
  const slides = [a, b, result]
  return (
    <div className="space-y-4 text-center">
      <Carousel
        items={slides}
        renderItem={(n) => <DotBoard count={n} />}
      />
      <div className="text-lg font-semibold">{a} + {b} = {result}</div>
    </div>
  )
}

export default AdditionModule
