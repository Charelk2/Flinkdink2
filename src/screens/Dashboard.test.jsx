import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthProvider'
import Dashboard from './Dashboard'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Dashboard', () => {
  it('PIN input uses responsive width classes', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      resetToday: jest.fn(),
      resetAll: jest.fn(),
      weekData: null,
      loading: false,
      error: null,
      jumpToWeek: jest.fn(),
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>,
    )

    const input = screen.getByLabelText('PIN')
    expect(input).toHaveClass('w-full')
    expect(input).toHaveClass('max-w-xs')
  })
  it('unlocks with PIN and shows progress grid', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 2, session: 2 },
      resetToday: jest.fn(),
      resetAll: jest.fn(),
      weekData: null,
      loading: false,
      error: null,
      jumpToWeek: jest.fn(),
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('PIN'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    // day 1 modules are all complete
    expect(screen.getByTestId('day1-module0')).toHaveClass('bg-green-400')
    expect(screen.getByTestId('day1-module2')).toHaveClass('bg-green-400')
    // day 2 first module complete only
    expect(screen.getByTestId('day2-module0')).toHaveClass('bg-green-400')
    expect(screen.getByTestId('day2-module1')).toHaveClass('bg-gray-200')
  })

  it('shows week buttons and jumps to week', () => {
    const jumpToWeek = jest.fn()
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      resetToday: jest.fn(),
      resetAll: jest.fn(),
      weekData: null,
      loading: false,
      error: null,
      jumpToWeek,
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('PIN'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    expect(screen.getByTestId('week-btn-10')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('week-btn-10'))
    expect(jumpToWeek).toHaveBeenCalledWith(10)
  })

  it('uses responsive classes for week grid', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      resetToday: jest.fn(),
      resetAll: jest.fn(),
      weekData: null,
      loading: false,
      error: null,
      jumpToWeek: jest.fn(),
    })

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('PIN'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    expect(screen.getByTestId('week-grid')).toHaveClass(
      'grid grid-cols-7 sm:grid-cols-13 gap-1 text-center',
    )
  })
})
