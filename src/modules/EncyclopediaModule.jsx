import { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import encyclopediaImages from '../utils/encyclopediaImages'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const EncyclopediaModule = ({ cards }) => {
  const [items, setItems] = useState(() =>
    shuffle(
      cards.map((c) => ({
        ...c,
        image: encyclopediaImages[c.id] || c.image,
      })),
    ),
  )

  useEffect(() => {
    setItems(
      shuffle(
        cards.map((c) => ({
          ...c,
          image: encyclopediaImages[c.id] || c.image,
        })),
      ),
    )
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
