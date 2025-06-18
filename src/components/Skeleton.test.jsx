import { render } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('applies utility classes', () => {
    const { container } = render(<Skeleton className="h-4" />)
    const div = container.firstChild
    expect(div).toHaveClass('animate-pulse', 'bg-gray-200', 'rounded', 'h-4')
  })
})
