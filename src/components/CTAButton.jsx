import { Link } from 'react-router-dom'

const CTAButton = ({ children, to, ...props }) => {
  if (to) {
    return (
      <Link to={to} className="cta-btn" {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className="cta-btn" {...props}>
      {children}
    </button>
  )
}

export default CTAButton
