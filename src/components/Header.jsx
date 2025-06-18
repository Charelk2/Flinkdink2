import { Link } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'

const Header = () => {
  const { progress } = useContent()
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow p-4 flex items-center justify-between z-50" data-testid="app-header">
      <Link to="/" aria-label="Home" className="text-2xl">🏠</Link>
      <span className="text-sm font-semibold">
        Week {progress.week} • Day {progress.day} • Session {progress.session}
      </span>
    </header>
  )
}

export default Header
