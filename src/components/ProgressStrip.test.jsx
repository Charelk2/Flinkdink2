import { render, screen } from '@testing-library/react'
import ProgressStrip from './ProgressStrip'

describe('ProgressStrip', () => {
  it('shows progress text and filled dots', () => {
    render(<ProgressStrip week={1} day={2} session={3} completedSessions={2} />)

    expect(screen.getByText('Week 1 \u2022 Day 2 \u2022 Session 3')).toBeInTheDocument()
    const group = screen.getByLabelText('sessions-progress')
    expect(group).toBeInTheDocument()

    const dots = screen.getAllByTestId('session-dot')
    expect(dots).toHaveLength(3)
    const filled = dots.filter((d) => d.classList.contains('filled'))
    expect(filled).toHaveLength(2)
  })
})
