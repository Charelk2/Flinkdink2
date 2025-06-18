import { Link } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'

const Home = () => {
  const { progress } = useContent()
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4 text-center">
      <h1 className="text-3xl font-bold">FlinkDink Flashcards</h1>
      <p>
        Week {progress.week} – Day {progress.day} – Session {progress.session}
      </p>
      <Link to="/session" className="btn">
        Start Session
      </Link>
    </div>
  )
}

export default Home
