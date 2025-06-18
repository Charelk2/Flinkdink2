import { Link, useLocation, useNavigate } from 'react-router-dom';
import SettingsButton from './SettingsButton';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const handleSettings = () => navigate('/dashboard');
  return (
    <nav className="sticky top-0 w-full bg-gray-50 shadow-sm flex items-center px-6 py-4 z-50">
      {isHome ? (
        <>
          <div className="flex-1" />
          <span className="mx-auto font-bold text-2xl text-indigo-600">FlinkDink</span>
          <SettingsButton onClick={handleSettings} />
        </>
      ) : (
        <>
          <Link
            to="/"
            aria-label="Home"
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            🏠
          </Link>
          <div className="flex-1" />
          <SettingsButton onClick={handleSettings} />
        </>
      )}
    </nav>
  );
};

export default NavBar;
