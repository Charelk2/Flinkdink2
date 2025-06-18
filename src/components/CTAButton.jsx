import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentProvider';

const CTAButton = () => {
  const { progress } = useContent();
  const { week, day, session } = progress;
  const label =
    session === 1
      ? `Start Week ${week} • Day ${day} • Session ${session} →`
      : `Continue Week ${week} • Day ${day} • Session ${session} →`;

  return (
    <Link
      to="/session"
      className="block w-full text-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-lg mt-6 md:mt-8 mx-4 md:mx-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {label}
    </Link>
  );
};

export default CTAButton;
