import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Home screen', () => {
  it('renders hero, progress, themes and CTA', () => {
    useContent.mockReturnValue({
      progress: { week: 2, day: 3, session: 2 },
      weekData: {
        language: ['apple'],
        mathWindowStart: 10,
        encyclopedia: [{ title: 'Lion' }],
      },
      loading: false,
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: /flinkdink flashcards/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Week 2 \u2022 Day 3 \u2022 Session 2'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /continue week 2 • day 3 • session 2/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
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
