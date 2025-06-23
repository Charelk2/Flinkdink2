const Flashcard = ({ children }) => {
  return (
    <div className="w-full max-w-md mx-auto h-[360px] flex items-center justify-center border-2 border-gray-300 rounded-2xl shadow-md p-4 bg-white">
      {children}
    </div>
  );
};

export default Flashcard;
