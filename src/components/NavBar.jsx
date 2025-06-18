import { Link, useLocation } from 'react-router-dom'
import SettingsButton from './SettingsButton'

const NavBar = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <nav className="sticky top-0 bg-gray-50 shadow-sm flex items-center p-4 z-50">
      {isHome ? (
        <>
          <div className="flex-1" />
          <span className="mx-auto font-bold text-indigo-600">FlinkDink</span>
          <SettingsButton />
        </>
      ) : (
        <>
          <Link
            to="/"
            aria-label="Home"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            🏠
          </Link>
          <div className="flex-1" />
          <SettingsButton />
        </>
      )}
    </nav>
  )
}

export default NavBar
