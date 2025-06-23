import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header data-testid="app-header">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link to="/" aria-label="Home" className="text-2xl">
          🏠
        </Link>
      </div>
    </header>
  )
}

export default Header
