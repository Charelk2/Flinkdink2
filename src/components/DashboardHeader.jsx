import ProgressStrip from './ProgressStrip';
import { useContent } from '../contexts/ContentProvider';

const DashboardHeader = () => {
  const { progress } = useContent();
  const { week, day, session, streak } = progress;
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold">
        Week {week} · Day {day} · Session {session}
      </h1>
      <ProgressStrip />
      <p className="text-lg font-semibold" data-testid="streak">
        Streak: {streak}
      </p>
    </div>
  );
};

export default DashboardHeader;
