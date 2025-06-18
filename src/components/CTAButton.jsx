import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentProvider';

const CTAButton = () => {
  const { progress } = useContent();
  const { week, day, session } = progress;
  const label = session === 1 ? 'Start' : 'Continue';

  return (
    <Link
      to="/session"
      className="cta-btn shadow-lg mt-6 md:mt-8 mx-4 md:mx-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <span>
        {label} Week {week} · Day {day} · Session {session}
      </span>
      <span className="cta-arrow" aria-hidden="true">→</span>
    </Link>
  );
};

export default CTAButton;
