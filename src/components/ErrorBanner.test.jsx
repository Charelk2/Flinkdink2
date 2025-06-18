import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBanner from './ErrorBanner'
import { useContent } from '../contexts/ContentProvider'

jest.mock('../contexts/ContentProvider')

describe('ErrorBanner', () => {
  it('renders nothing when no error', () => {
    useContent.mockReturnValue({ error: null })
    const { container } = render(<ErrorBanner />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows error message and calls loadWeek on retry', () => {
    const loadWeek = jest.fn()
    useContent.mockReturnValue({ error: new Error('404'), loadWeek })
    render(<ErrorBanner />)
    expect(screen.getByRole('alert')).toHaveTextContent('404')
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(loadWeek).toHaveBeenCalled()
  })
})
