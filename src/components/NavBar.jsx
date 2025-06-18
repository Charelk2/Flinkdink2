import { Link, useLocation, useNavigate } from 'react-router-dom';
import SettingsButton from './SettingsButton';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleSettings = () => navigate('/dashboard');
  const common = 'w-full bg-gray-50 shadow-sm px-6 py-4 flex items-center justify-between';
  return pathname === '/' ? (
    <nav className={common}>
      <div className="flex-1" />
      <span className="text-2xl font-bold text-indigo-600">FlinkDink</span>
      <SettingsButton onClick={handleSettings} />
    </nav>
  ) : (
    <nav className={common}>
      <Link
        to="/"
        aria-label="Home"
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        🏠
      </Link>
      <SettingsButton onClick={handleSettings} />
    </nav>
  );
};

export default NavBar;
