import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('displays headline and tagline', () => {
    render(<Hero headline="Hello" tagline="World" />)
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
    expect(screen.getByText('World')).toBeInTheDocument()
  })
})
