import { render, screen, fireEvent } from '@testing-library/react'
import FullscreenButton from './FullscreenButton'

describe('FullscreenButton', () => {
  it('fires onClick when pressed', () => {
    const onClick = jest.fn()
    render(<FullscreenButton onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: /enter fullscreen/i }))
    expect(onClick).toHaveBeenCalled()
  })
})
