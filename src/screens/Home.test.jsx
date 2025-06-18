import { render, screen } from '@testing-library/react'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Home screen', () => {
  it('renders progress and next session titles', () => {
    useContent.mockReturnValue({ progress: { version: 1, week: 2, day: 3, session: 2 }, loading: false })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByText('Week 2 – Day 3')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /Start Week 2 • Day 3 • Session 2/i,
      }),
    ).toBeInTheDocument()

    const dots = screen.getAllByTestId('session-dot')
    expect(dots).toHaveLength(3)
    const filled = dots.filter((d) => d.classList.contains('filled'))
    expect(filled).toHaveLength(1)

    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('Knowledge')).toBeInTheDocument()
  })

  it('shows skeleton when loading', () => {
    useContent.mockReturnValue({ loading: true })
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })
})
