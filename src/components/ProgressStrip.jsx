import { useContent } from '../contexts/ContentProvider'

const ProgressStrip = () => {
  const { progress } = useContent()
  const completedSessions = progress.session - 1
  return (
    <div className="text-center space-y-1">
      <p className="font-semibold text-gray-700">
        Week {progress.week} • Day {progress.day} • Session {progress.session}
      </p>
      <div className="flex justify-center gap-1" aria-label="sessions-progress">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            data-testid="session-dot"
            className={`rounded-full ${n <= completedSessions ? 'bg-indigo-600' : 'bg-gray-300'}`}
            style={{ width: '8px', height: '8px' }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {completedSessions} of 3 sessions
      </p>
    </div>
  )
}

export default ProgressStrip
