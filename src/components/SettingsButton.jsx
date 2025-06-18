const SettingsButton = ({ onClick }) => (
  <button
    type="button"
    aria-label="Settings"
    onClick={onClick}
    className="icon-btn hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    ⚙️
  </button>
);

export default SettingsButton;
