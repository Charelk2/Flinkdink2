import { render, screen } from '@testing-library/react'
import AdditionModule from './AdditionModule'

describe('AdditionModule', () => {
  it('renders dots for each part of the sum', () => {
    const sum = { a: 1, b: 2, sum: 3 }
    render(<AdditionModule sum={sum} />)
    const counters = screen.getAllByTestId('dot-count')
    expect(counters).toHaveLength(3)
    expect(screen.getByText('1 + 2 = 3')).toBeInTheDocument()
  })
})
