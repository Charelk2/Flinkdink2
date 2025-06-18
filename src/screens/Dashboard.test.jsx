import { render, screen, fireEvent } from '@testing-library/react'
import Dashboard from './Dashboard'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('Dashboard', () => {
  it('unlocks with PIN and shows progress grid', () => {
    useContent.mockReturnValue({
      progress: { week: 1, day: 2, session: 2 },
      resetToday: jest.fn(),
      resetAll: jest.fn(),
    })

    render(<Dashboard />)

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
})
