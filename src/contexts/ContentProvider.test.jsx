import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react'
import { ContentProvider, useContent } from './ContentProvider'

const TestConsumer = () => {
  const { weekData, loading, error } = useContent()
  if (loading) return <div>loading</div>
  if (error) return <div data-testid="error">{error.message}</div>
  return <div data-testid="language">{weekData.language[0]}</div>
}

const ProgressConsumer = () => {
  const { progress } = useContent()
  return <div data-testid="progress">{progress.week}</div>
}

afterEach(() => {
  jest.restoreAllMocks()
  cleanup()
  localStorage.clear()
  delete global.fetch
})

describe('ContentProvider fetch handling', () => {
  it('loads week data successfully', async () => {
  global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ language: ['hi'], mathWindowStart: 0, encyclopedia: [] }),
    })

    render(
      <ContentProvider>
        <TestConsumer />
      </ContentProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('language')).toBeInTheDocument())
    expect(screen.getByTestId('language')).toHaveTextContent('hi')
  })

  it('handles fetch failure', async () => {
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 })

    render(
      <ContentProvider>
        <TestConsumer />
      </ContentProvider>,
    )

    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument())
    expect(screen.getByTestId('error')).toHaveTextContent('404')
  })
})

describe('progress version handling', () => {

  it('loads stored progress when version matches', () => {
    localStorage.setItem(
      'progress-v1',
      JSON.stringify({ version: 1, week: 5, day: 6, session: 2 }),
    )

    render(
      <ContentProvider>
        <ProgressConsumer />
      </ContentProvider>,
    )

    expect(screen.getByTestId('progress')).toHaveTextContent('5')
  })

  it('resets progress when version mismatches', () => {
    localStorage.setItem(
      'progress-v1',
      JSON.stringify({ version: 0, week: 5, day: 6, session: 2 }),
    )

    render(
      <ContentProvider>
        <ProgressConsumer />
      </ContentProvider>,
    )

    expect(screen.getByTestId('progress')).toHaveTextContent('1')
  })
})

describe('previousWeek', () => {
  const PrevConsumer = () => {
    const { progress, previousWeek } = useContent()
    return (
      <div>
        <span data-testid="week">{progress.week}</span>
        <span data-testid="day">{progress.day}</span>
        <span data-testid="session">{progress.session}</span>
        <button type="button" onClick={previousWeek}>
          prev
        </button>
      </div>
    )
  }

  it('moves back one week and resets day and session', () => {
    localStorage.setItem(
      'progress-v1',
      JSON.stringify({ version: 1, week: 3, day: 4, session: 2 }),
    )

    render(
      <ContentProvider>
        <PrevConsumer />
      </ContentProvider>,
    )

    expect(screen.getByTestId('week')).toHaveTextContent('3')
    fireEvent.click(screen.getByText('prev'))
    expect(screen.getByTestId('week')).toHaveTextContent('2')
    expect(screen.getByTestId('day')).toHaveTextContent('1')
    expect(screen.getByTestId('session')).toHaveTextContent('1')
    const stored = JSON.parse(localStorage.getItem('progress-v1'))
    expect(stored.week).toBe(2)
    expect(stored.day).toBe(1)
    expect(stored.session).toBe(1)
  })
})
