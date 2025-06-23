import PropTypes from 'prop-types'

const FullscreenButton = ({ onClick, isFullscreen }) => (
  <button
    type="button"
    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    onClick={onClick}
    className="icon-btn hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    {isFullscreen ? '❌' : '⤢'}
  </button>
)

FullscreenButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool,
}

FullscreenButton.defaultProps = {
  isFullscreen: false,
}

export default FullscreenButton
