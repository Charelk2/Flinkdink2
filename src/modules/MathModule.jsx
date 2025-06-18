import Carousel from '../components/Carousel'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const MathModule = ({ start }) => {
  const numbers = Array.from({ length: 10 }, (_, i) => start + i)
  const first = shuffle(numbers.slice(0, 5))
  const slides = [...first, ...numbers.slice(5)]

  return (
    <Carousel
      items={slides}
      renderItem={(n) => (
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: n }).map((_, i) => (
            <span key={i} className="w-4 h-4 bg-red-500 rounded-full" />
          ))}
        </div>
      )}
    />
  )
}

export default MathModule
