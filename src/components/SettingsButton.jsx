const SettingsButton = ({ onClick }) => (
  <button
    type="button"
    aria-label="Settings"
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    ⚙️
  </button>
)

export default SettingsButton
