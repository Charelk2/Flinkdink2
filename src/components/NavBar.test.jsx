import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'

describe('NavBar', () => {
  it('shows logo and settings on the home route', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NavBar />
      </MemoryRouter>,
    )
    expect(screen.getByText('FlinkDink')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /home/i })).toBeNull()
  })

  it('shows home link on the session route', () => {
    render(
      <MemoryRouter initialEntries={["/session"]}>
        <NavBar />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
  })

  it('navigates to dashboard when settings clicked', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<NavBar />} />
          <Route path="/dashboard" element={<div>Dash</div>} />
        </Routes>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /settings/i }))
    expect(screen.getByText('Dash')).toBeInTheDocument()
  })
})
