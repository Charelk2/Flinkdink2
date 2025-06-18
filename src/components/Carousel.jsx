import { useEffect, useRef, useState } from 'react'

const swipeThreshold = 50

const Carousel = ({ items, renderItem }) => {
  const [index, setIndex] = useState(0)
  const startX = useRef(0)

  const next = () => setIndex((i) => Math.min(i + 1, items.length - 1))
  const prev = () => setIndex((i) => Math.max(i - 1, 0))

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setIndex((i) => Math.min(i + 1, items.length - 1))
      }
      if (e.key === 'ArrowLeft') {
        setIndex((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [items.length])

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX.current
    if (diff > swipeThreshold) prev()
    else if (diff < -swipeThreshold) next()
  }

  return (
    <div className="space-y-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="card flex items-center justify-center min-h-[50vh]">
        {renderItem(items[index])}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prev}
          disabled={index === 0}
          className="btn"
          aria-label="Previous card"
        >
          Prev
        </button>
        <button
          onClick={next}
          disabled={index === items.length - 1}
          className="btn"
          aria-label="Next card"
        >
          Next
        </button>
      </div>
      <div className="flex justify-center gap-1" aria-label="carousel-progress">
        {items.map((_, i) => (
          <span
            key={i}
            data-testid="carousel-dot"
            className={`progress-dot${i === index ? ' filled' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
