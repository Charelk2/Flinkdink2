import Flashcard from './Flashcard';

const ImageFactCard = ({ card }) => {
  return (
    <Flashcard>
      <div className="text-center">
        <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-lg mb-2" />
        <h3 className="text-xl font-semibold">{card.title}</h3>
        <p className="text-sm text-gray-600">{card.fact}</p>
      </div>
    </Flashcard>
  );
};

export default ImageFactCard;
