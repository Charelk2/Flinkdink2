import Flashcard from './Flashcard';

const WordCard = ({ word }) => {
  return (
    <Flashcard>
      <h2 className="text-4xl font-bold text-gray-800">{word}</h2>
    </Flashcard>
  );
};

export default WordCard;
