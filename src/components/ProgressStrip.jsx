import { useContent } from '../contexts/ContentProvider';

const ProgressStrip = () => {
  const { progress } = useContent();
  const { week, day, session } = progress;
  return (
    <div className="text-center space-y-1">
      <p className="font-semibold text-gray-700">Week {week} · Day {day} · Session {session}</p>
      <div className="flex items-center justify-center space-x-1" aria-label="sessions-progress">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            data-testid="session-dot"
            className={`rounded-full ${n <= session ? 'bg-indigo-600' : 'bg-gray-300'}`}
            style={{ width: '8px', height: '8px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressStrip;
