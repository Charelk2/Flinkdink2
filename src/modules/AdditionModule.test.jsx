import { render, screen } from '@testing-library/react'
import AdditionModule from './AdditionModule'

describe('AdditionModule', () => {
  it('renders a three slide carousel for the sum', () => {
    const sum = { a: 1, b: 2, sum: 3 }
    render(<AdditionModule sum={sum} />)
    const dots = screen.getAllByTestId('carousel-dot')
    expect(dots).toHaveLength(3)
    expect(screen.getByTestId('dot-count')).toHaveTextContent('1')
    expect(screen.getByText('1 + 2 = 3')).toBeInTheDocument()
  })
})
