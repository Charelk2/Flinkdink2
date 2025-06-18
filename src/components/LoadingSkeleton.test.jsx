import { render, screen } from '@testing-library/react'
import LoadingSkeleton from './LoadingSkeleton'

describe('LoadingSkeleton', () => {
  it('sets aria-busy and includes skeleton blocks', () => {
    render(<LoadingSkeleton />)
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-busy', 'true')
    expect(screen.getAllByRole('generic', { hidden: true }).length).toBeGreaterThan(0)
  })
})
