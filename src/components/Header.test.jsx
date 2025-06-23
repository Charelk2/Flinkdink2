import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from './Header'


describe('Header', () => {
  it('shows home link without progress text', () => {

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    )

    expect(screen.queryByText(/Week/)).toBeNull()
    const header = screen.getByTestId('app-header')
    expect(header).not.toHaveAttribute('class')
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })
})
