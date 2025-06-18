import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from './NavBar'

describe('NavBar', () => {
  it('renders home link and settings button', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByText('FlinkDink')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
  })
})
