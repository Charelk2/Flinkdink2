import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authHelpers';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-brand text-secondary"
    >
      <span aria-hidden="true">🚪</span>
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;
