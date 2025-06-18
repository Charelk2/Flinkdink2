const ProgressStrip = ({ week, day, session, completedSessions }) => (
  <div className="text-center space-y-2">
    <p className="font-semibold">
      Week {week} • Day {day} • Session {session}
    </p>
    <div className="flex justify-center gap-1" aria-label="sessions-progress">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          data-testid="session-dot"
          className={`progress-dot${n <= completedSessions ? ' filled' : ''}`}
        />
      ))}
    </div>
    <p className="text-sm text-gray-600">
      {completedSessions} of 3 sessions complete
    </p>
  </div>
)

export default ProgressStrip
