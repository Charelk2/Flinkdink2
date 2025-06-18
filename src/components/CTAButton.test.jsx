import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CTAButton from './CTAButton'

describe('CTAButton', () => {
  it('renders as a link when "to" is provided', () => {
    render(
      <MemoryRouter>
        <CTAButton to="/next">Go</CTAButton>
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /go/i })
    expect(link).toHaveAttribute('href', '/next')
  })

  it('renders as a button by default', () => {
    render(<CTAButton>Click</CTAButton>)
    const button = screen.getByRole('button', { name: /click/i })
    expect(button).toBeInTheDocument()
  })
})
