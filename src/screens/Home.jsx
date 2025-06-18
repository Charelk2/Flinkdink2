import { Link } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'
import LoadingSkeleton from '../components/LoadingSkeleton'

const Home = () => {
  const { progress, loading, previousWeek } = useContent()
  if (loading) return <LoadingSkeleton />
  const completed = progress.session - 1
  const titles = ['Language', 'Math', 'Knowledge']

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4 p-4 pt-12 text-center">
      <h1 className="text-3xl font-bold">FlinkDink Flashcards</h1>
      <p>
        Week {progress.week} – Day {progress.day}
      </p>
      {progress.streak >= 2 && (
        <span className="badge">🔥 {progress.streak}-day streak</span>
      )}
      <div className="flex gap-1" aria-label="sessions-progress">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            data-testid="session-dot"
            className={`progress-dot${n <= completed ? ' filled' : ''}`}
          />
        ))}
      </div>
      <ul className="text-sm text-gray-600 space-y-1">
        {titles.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <Link to="/session" className="btn w-full">
        Start Week {progress.week} • Day {progress.day} • Session {progress.session}
      </Link>
      {progress.week > 1 && (
        <button type="button" onClick={previousWeek} className="btn">
          ← Previous Week
        </button>
      )}
    </div>
  )
}

export default Home
