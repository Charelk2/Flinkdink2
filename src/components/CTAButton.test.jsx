import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CTAButton from './CTAButton'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('CTAButton', () => {
  it('shows a start label on first session', () => {
    useContent.mockReturnValue({ progress: { week: 1, day: 2, session: 1 } })
    render(
      <MemoryRouter>
        <CTAButton />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /start week 1 • day 2 • session 1/i })
    expect(link).toHaveAttribute('href', '/session')
  })

  it('shows a continue label on later sessions', () => {
    useContent.mockReturnValue({ progress: { week: 3, day: 4, session: 2 } })
    render(
      <MemoryRouter>
        <CTAButton />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('link', { name: /continue week 3 • day 4 • session 2/i }),
    ).toBeInTheDocument()
  })
})
