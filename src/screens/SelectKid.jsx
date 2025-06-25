import KidSelector from '../components/KidSelector';

export default function SelectKid() {
  return (
    <div
      className="p-4 flex flex-col items-center justify-center min-h-screen bg-[url('/images/kid-selector.svg')] bg-cover text-black"
      data-testid="select-kid"
    >
      <h1 className="text-2xl font-bold mb-6">Who’s learning today?</h1>
      <KidSelector />
    </div>
  );
}
