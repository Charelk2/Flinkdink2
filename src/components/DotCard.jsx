import Flashcard from './Flashcard';

const DotCard = ({ count }) => {
  const dots = Array(count).fill(0);
  return (
    <Flashcard>
      <div className="grid grid-cols-5 gap-2">
        {dots.map((_, i) => (
          <div key={i} className="w-4 h-4 bg-red-500 rounded-full"></div>
        ))}
      </div>
    </Flashcard>
  );
};

export default DotCard;
