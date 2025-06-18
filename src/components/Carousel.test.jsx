import { render, screen, fireEvent } from '@testing-library/react'
import Carousel from './Carousel'

describe('Carousel', () => {
  it('updates progress dots when navigating', () => {
    const items = ['a', 'b', 'c']
    render(
      <Carousel items={items} renderItem={(i) => <div>{i}</div>} />,
    )

    const next = screen.getByRole('button', { name: /next/i })
    const dots = () => screen.getAllByTestId('carousel-dot')

    expect(dots()[0]).toHaveClass('filled')
    fireEvent.click(next)
    expect(dots()[1]).toHaveClass('filled')
  })

  it('adds accessible labels to navigation buttons', () => {
    const items = ['a', 'b']
    render(<Carousel items={items} renderItem={(i) => <div>{i}</div>} />)

    const prevButtons = screen.getAllByRole('button', { name: /previous card/i })
    const nextButtons = screen.getAllByRole('button', { name: /next card/i })

    expect(prevButtons.length).toBeGreaterThan(0)
    expect(nextButtons.length).toBeGreaterThan(0)
  })
})
