import { Link } from 'react-router-dom'
import SettingsButton from './SettingsButton'

const NavBar = () => (
  <nav className="flex items-center justify-between p-4 shadow">
    <Link to="/" aria-label="Home" className="icon-btn">
      🏠
    </Link>
    <span className="font-bold text-xl">FlinkDink</span>
    <SettingsButton />
  </nav>
)

export default NavBar
