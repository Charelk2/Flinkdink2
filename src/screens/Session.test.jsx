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
})
