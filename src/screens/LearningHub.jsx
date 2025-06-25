import { Link } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileProvider';
import { useContent, TOTAL_WEEKS } from '../contexts/ContentProvider';

export default function LearningHub() {
  const { selectedProfile } = useProfiles();
  const { progress } = useContent();
  const { week, day, session } = progress;

  const completedSessions = (week - 1) * 21 + (day - 1) * 3 + (session - 1);
  const totalSessions = TOTAL_WEEKS * 7 * 3;
  const percent = Math.round((completedSessions / totalSessions) * 100);

  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });

  if (!selectedProfile) {
    return null;
  }

  return (
    <div className="p-4 space-y-4" data-testid="learning-hub">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span aria-label="avatar">{selectedProfile.avatar}</span>
        <span>
          🎉 Welcome back, {selectedProfile.name}!
        </span>
      </h1>
      <div className="space-y-1 text-center">
        <p data-testid="session-info">
          Week {week} · Day {day} · Session {session}
        </p>
        <p data-testid="date-info">
          {weekday} · Week {week}, Day {day}
        </p>
      </div>
      <div className="flex justify-center">
        <div
          className="w-24 h-24 ring-4 ring-green-400 rounded-full flex items-center justify-center animate-pulse text-center"
          data-testid="progress-circle"
        >
          {percent}%
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Link
          to="/session"
          className="bg-purple-600 text-white rounded-xl px-4 py-2 w-full text-center"
        >
          Continue Session
        </Link>
        <Link
          to="/progress"
          className="border-2 border-gray-400 rounded-xl px-4 py-2 w-full text-center"
        >
          View Progress
        </Link>
      </div>
    </div>
  );
}
