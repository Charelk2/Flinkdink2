/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
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
})
