import { NavLink, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/learning-hub', label: 'Home', icon: '🏠' },
  { to: '/select-kid', label: 'Profiles', icon: '👶' },
  { to: '/session', label: 'Curriculum', icon: '📚' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/dashboard', label: 'Settings', icon: '⚙️' },
];

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-gray-50 shadow-sm px-2 py-2 flex justify-around fixed bottom-0" role="navigation">
      {NAV_ITEMS.map((item) => {
        const active = pathname.startsWith(item.to);
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              active ? 'text-indigo-600 font-bold' : 'text-gray-600'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavBar;
