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

  it('invokes onIndexChange when the slide changes', () => {
    const items = ['a', 'b']
    const handler = jest.fn()
    render(
      <Carousel
        items={items}
        renderItem={(i) => <div>{i}</div>}
        onIndexChange={handler}
      />,
    )

    expect(handler).toHaveBeenCalledWith(0)
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(handler).toHaveBeenLastCalledWith(1)
  })
})
