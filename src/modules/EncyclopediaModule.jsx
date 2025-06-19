import { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import { fetchPhoto } from '../utils/fetchPhoto'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const EncyclopediaModule = ({ cards }) => {
  const [items, setItems] = useState(() => shuffle(cards))

  useEffect(() => {
    const shuffled = shuffle(cards)
    setItems(shuffled)

    let active = true
    shuffled.forEach((card, index) => {
      const searchTerm = card.query || card.title
      fetchPhoto(searchTerm)
        .then((url) => {
          if (active) {
            setItems((prev) => {
              const next = [...prev]
              next[index] = { ...next[index], image: url }
              return next
            })
          }
        })
        .catch((err) => {
          console.error('Failed to fetch image', err)
        })
    })

    return () => {
      active = false
    }
  }, [cards])

  return (
    <Carousel
      items={items}
      renderItem={(card) => (
        <div className="space-y-2">
          <img
            loading="lazy"
            src={card.image}
            alt={card.title}
            className="w-full h-48 sm:h-64 object-cover rounded-xl"
          />
          <h3 className="text-xl font-bold">{card.title}</h3>
          <p className="text-gray-600">{card.fact}</p>
        </div>
      )}
    />
  )
}

export default EncyclopediaModule
