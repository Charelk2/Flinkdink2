import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Session from './Session'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Session screen', () => {
  it('shows skeleton when loading', () => {
    useContent.mockReturnValue({ loading: true })
    render(
      <MemoryRouter>
        <Session />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('shows error when week data fails', () => {
    useContent.mockReturnValue({ loading: false, error: new Error('404') })
    render(
      <MemoryRouter>
        <Session />
      </MemoryRouter>,
    )
    expect(screen.getByText(/failed to load week data/i)).toBeInTheDocument()
  })

  it('renders header when data loaded', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      weekData: {
        language: ['one'],
        mathWindowStart: 1,
        encyclopedia: [{ image: 'a', title: 'A', fact: 'fact' }],
      },
      loading: false,
      error: null,
      completeSession: jest.fn(),
    })
    render(
      <MemoryRouter>
        <Session />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('app-header')).toBeInTheDocument()
  })
})
