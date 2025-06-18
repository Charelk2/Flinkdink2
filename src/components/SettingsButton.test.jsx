import { render, screen, fireEvent } from '@testing-library/react'
import SettingsButton from './SettingsButton'

describe('SettingsButton', () => {
  it('fires onClick when pressed', () => {
    const onClick = jest.fn()
    render(<SettingsButton onClick={onClick} />)
    fireEvent.click(screen.getByRole('button', { name: /settings/i }))
    expect(onClick).toHaveBeenCalled()
  })
})
