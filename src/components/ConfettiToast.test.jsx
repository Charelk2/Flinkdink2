import { render } from '@testing-library/react'
import ConfettiToast from './ConfettiToast'

jest.useFakeTimers()

describe('ConfettiToast', () => {
  it('calls onDone after the timeout', () => {
    const onDone = jest.fn()
    render(<ConfettiToast onDone={onDone} />)
    jest.runAllTimers()
    expect(onDone).toHaveBeenCalled()
  })
})
