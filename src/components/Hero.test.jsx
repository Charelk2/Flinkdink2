import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('displays the static headline and tagline', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: /flinkdink flashcards/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/joyful early learning for toddlers/i),
    ).toBeInTheDocument()
  })
})
