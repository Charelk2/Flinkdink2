import DashboardHeader from '../components/DashboardHeader';
import { useContent, TOTAL_WEEKS } from '../contexts/ContentProvider';
import { useProfiles } from '../contexts/ProfileProvider';
import { BADGE_MAP } from '../utils/badges';

export default function Progress() {
  const { progress } = useContent();
  const { selectedProfile } = useProfiles();

  if (!selectedProfile) {
    return null;
  }

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className="p-4 space-y-4" data-testid="progress-screen">
      <DashboardHeader />
      {selectedProfile.badges.length > 0 && (
        <div className="flex justify-center space-x-2" data-testid="badge-list">
          {selectedProfile.badges.map((b) => (
            <span key={b} role="img" aria-label={BADGE_MAP[b].label}>
              {BADGE_MAP[b].icon}
            </span>
          ))}
        </div>
      )}
      <h2 className="text-xl font-semibold">Overall Progress</h2>
      <div
        className="grid grid-cols-7 sm:grid-cols-13 gap-1 text-center"
        data-testid="weeks-grid"
      >
        {weeks.map((w) => (
          <div
            key={w}
            data-testid={`week-cell-${w}`}
            className={`border p-1 rounded ${
              w < progress.week
                ? 'bg-green-300'
                : w === progress.week
                  ? 'bg-indigo-200'
                  : 'bg-gray-200'
            }`}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}
