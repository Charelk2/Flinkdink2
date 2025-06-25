import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import NavBar from './NavBar'
import { AuthProvider } from '../contexts/AuthProvider'

describe('NavBar', () => {
  it('renders tab links with labels', () => {
    render(
      <MemoryRouter initialEntries={["/learning-hub"]}>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /profiles/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /curriculum/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /progress/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })

  it('highlights the active tab', () => {
    render(
      <MemoryRouter initialEntries={["/progress"]}>
        <AuthProvider>
          <NavBar />
        </AuthProvider>
      </MemoryRouter>,
    )
    const active = screen.getByRole('link', { name: /progress/i })
    expect(active).toHaveAttribute('aria-current', 'page')
  })

  it('navigates when a tab is clicked', () => {
    render(
      <MemoryRouter initialEntries={["/learning-hub"]}>
        <AuthProvider>
          <Routes>
            <Route path="/learning-hub" element={<NavBar />} />
            <Route path="/dashboard" element={<div>Dash</div>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('link', { name: /settings/i }))
    expect(screen.getByText('Dash')).toBeInTheDocument()
  })
})
