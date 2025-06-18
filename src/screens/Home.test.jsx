import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Home screen', () => {
  it('renders headline, progress info and navigation controls', () => {
    useContent.mockReturnValue({
      progress: {
        version: 1,
        week: 2,
        day: 3,
        session: 2,
        streak: 1,
      },
      loading: false,
      previousWeek: jest.fn(),
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'FlinkDink Flashcards' })).toBeInTheDocument()
    expect(screen.getByText('Week 2 \u2013 Day 3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()

    const dots = screen.getAllByTestId('session-dot')
    expect(dots).toHaveLength(3)

    expect(
      screen.getByRole('link', {
        name: /Start Week 2 • Day 3 • Session 2/i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('Math')).toBeInTheDocument()
    expect(screen.getByText('Knowledge')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /previous week/i })).toBeInTheDocument()
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

  it('hides previous week button when on week one', () => {
    useContent.mockReturnValue({
      progress: { version: 1, week: 1, day: 1, session: 1, streak: 0 },
      loading: false,
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(screen.queryByRole('button', { name: /previous week/i })).toBeNull()
  })
})
