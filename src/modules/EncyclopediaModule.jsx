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
        .then((img) => {
          if (active) {
            setItems((prev) => {
              const next = [...prev]
              next[index] = { ...next[index], image: img }
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
      renderItem={(card) => {
        const img =
          typeof card.image === 'string'
            ? { avif: card.image, webp: card.image, fallback: card.image }
            : card.image

        return (
          <div className="space-y-2">
            <picture className="zoom-img">
              <source type="image/avif" srcSet={img.avif} />
              <source type="image/webp" srcSet={img.webp} />
              <img
                loading="lazy"
                src={img.fallback}
                alt={card.title}
                className="w-full rounded-xl encyclopedia-thumb"
              />
            </picture>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-gray-600">{card.fact}</p>
          </div>
        )
      }}
    />
  )
}

export default EncyclopediaModule
