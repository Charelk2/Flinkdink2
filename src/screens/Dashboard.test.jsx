import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthProvider'
import Dashboard from './Dashboard'
import { useContent } from '../contexts/ContentProvider'
const { TOTAL_WEEKS } = jest.requireActual('../contexts/ContentProvider')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

jest.mock('../contexts/ContentProvider')

const origScroll = HTMLElement.prototype.scrollIntoView

afterEach(() => {
  jest.clearAllMocks()
  HTMLElement.prototype.scrollIntoView = origScroll
})

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
  it('unlocks with PIN and shows progress table', () => {
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
    expect(screen.getByRole('table', { name: /weekly progress/i })).toBeInTheDocument()
    // day 1 modules are all complete
    expect(screen.getByTestId('day1-module0')).toHaveClass('bg-green-400')
    expect(screen.getByTestId('day1-module2')).toHaveClass('bg-green-400')
    // day 2 first module complete only
    expect(screen.getByTestId('day2-module0')).toHaveClass('bg-green-400')
    expect(screen.getByTestId('day2-module1')).toHaveClass('bg-gray-200')
  })

  it('shows week buttons and jumps to week', () => {
    const jumpToWeek = jest.fn()
    const scrollMock = jest.fn()
    HTMLElement.prototype.scrollIntoView = scrollMock
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

    expect(screen.getByTestId(`week-btn-${TOTAL_WEEKS}`)).toBeInTheDocument()
    fireEvent.click(screen.getByTestId(`week-btn-${TOTAL_WEEKS}`))
    expect(screen.getByTestId('week-confirm')).toBeInTheDocument()
    expect(scrollMock).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(jumpToWeek).toHaveBeenCalledWith(TOTAL_WEEKS)
    expect(mockNavigate).toHaveBeenCalledWith('/session')
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

  it('uses fixed layout for progress table', () => {
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

    const table = screen.getByRole('table', { name: /weekly progress/i })
    expect(table).toHaveClass('progress-table', 'w-full', 'table-fixed', 'text-center', 'text-xs')
  })

  it('marks active week button and includes hover class', () => {
    useContent.mockReturnValue({
      progress: { week: 3, day: 1, session: 1 },
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

    const active = screen.getByTestId('week-btn-3')
    expect(active).toHaveAttribute('aria-current', 'true')
    expect(active).toHaveClass('font-bold')
    expect(active).toHaveClass('hover:bg-indigo-100')
    expect(active).toHaveClass('cursor-pointer')
  })

  it('renders control buttons with emoji labels', () => {
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

    expect(screen.getByRole('button', { name: '🔄 Reset Today' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '🗑️ Reset All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '⭐ Print Star Chart' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '📜 Print Certificate' })).toBeInTheDocument()
  })

  it('uses responsive grid for action buttons', () => {
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

    const grid = screen.getByTestId('action-grid')
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-4', 'gap-2')
    expect(screen.getByRole('button', { name: '🔄 Reset Today' })).toHaveClass('w-full', 'sm:w-auto')
  })

  it('prompts for confirmation before resetting all', () => {
    const resetAll = jest.fn()
    useContent.mockReturnValue({
      progress: { week: 1, day: 1, session: 1 },
      resetToday: jest.fn(),
      resetAll,
      weekData: null,
      loading: false,
      error: null,
      jumpToWeek: jest.fn(),
    })

    window.confirm = jest.fn(() => true)

    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('PIN'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: /unlock/i }))

    fireEvent.click(screen.getByRole('button', { name: '🗑️ Reset All' }))
    expect(window.confirm).toHaveBeenCalled()
    expect(resetAll).toHaveBeenCalled()
  })
})
