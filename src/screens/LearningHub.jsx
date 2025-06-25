import { Link } from 'react-router-dom';
import { useProfiles } from '../contexts/ProfileProvider';
import { useContent } from '../contexts/ContentProvider';
import { BADGE_MAP } from '../utils/badges';

export default function LearningHub() {
  const { selectedProfile } = useProfiles();
  const { progress, weekPercent } = useContent();
  const { week, day, session } = progress;

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
          {weekPercent}%
        </div>
      </div>
      {selectedProfile.badges.length > 0 && (
        <div className="flex justify-center space-x-2" data-testid="badge-list">
          {selectedProfile.badges.map((b) => (
            <span key={b} role="img" aria-label={BADGE_MAP[b].label}>
              {BADGE_MAP[b].icon}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-col items-center space-y-2">
        <Link
          to="/session"
          className="btn w-full text-lg"
        >
          Continue Session
        </Link>
        <Link
          to="/progress"
          className="border-2 border-secondary rounded-xl px-4 py-2 w-full text-center"
        >
          View Progress
        </Link>
      </div>
    </div>
  );
}
