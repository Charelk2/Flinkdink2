import { Link, useLocation, useNavigate } from 'react-router-dom';
import SettingsButton from './SettingsButton';
import { useAuth } from '../contexts/AuthProvider';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token, logout } = useAuth();
  const handleSettings = () => navigate('/dashboard');
  const common = 'w-full bg-gray-50 shadow-sm px-6 py-4 flex items-center justify-between';
  const authButton = token ? (
    <button type="button" onClick={logout} className="text-sm underline ml-2">
      Logout
    </button>
  ) : (
    <div className="flex items-center space-x-2">
      <Link to="/login" className="text-sm underline">Login</Link>
      <Link to="/signup" className="text-sm underline">Sign Up</Link>
    </div>
  );

  return pathname === '/' ? (
    <nav className={common}>
      <div className="flex-1" />
      <span className="text-2xl font-bold text-indigo-600">FlinkDink</span>
      <div className="flex items-center">
        {authButton}
        <SettingsButton onClick={handleSettings} />
      </div>
    </nav>
  ) : (
    <nav className={common}>
      <Link
        to="/"
        aria-label="Home"
        className="icon-btn hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        🏠
      </Link>
      <div className="flex items-center">
        {authButton}
        <SettingsButton onClick={handleSettings} />
      </div>
    </nav>
  );
};

export default NavBar;
