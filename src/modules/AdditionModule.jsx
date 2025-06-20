import { generateDotPositions } from '../utils/randomDots'

const DotBoard = ({ count }) => {
  const positions = generateDotPositions(count)
  return (
    <div className="relative inline-block w-16 h-16">
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
  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-center gap-2">
        <DotBoard count={a} />
        <span className="text-2xl font-bold">+</span>
        <DotBoard count={b} />
        <span className="text-2xl font-bold">=</span>
        <DotBoard count={result} />
      </div>
      <div className="text-lg font-semibold">{a} + {b} = {result}</div>
    </div>
  )
}

export default AdditionModule
