import ProgressStrip from './ProgressStrip';
import { useContent } from '../contexts/ContentProvider';
import { getTermForWeek } from '../utils/termHelpers';

const DashboardHeader = () => {
  const { progress } = useContent();
  const { week, day, session, streak } = progress;
  const term = getTermForWeek(week);
  return (
    <div className="text-center space-y-2 white-text-dashboard">
      <h1 className="text-3xl font-bold">
        Term {term} · Week {week} · Day {day} · Session {session}
      </h1>
      <ProgressStrip />
      <p className="white-text-dashboard text-lg font-semibold" data-testid="streak">
        Streak: {streak}
      </p>
    </div>
  );
};

export default DashboardHeader;
