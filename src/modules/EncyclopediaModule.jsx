import Carousel from '../components/Carousel'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const EncyclopediaModule = ({ cards }) => {
  const items = shuffle(cards)
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
