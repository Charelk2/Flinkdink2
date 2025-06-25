import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react'
import { ContentProvider, useContent, TOTAL_WEEKS } from './ContentProvider'
import { ProfileProvider, PROFILES_KEY, PROGRESS_KEY, DEFAULT_PROGRESS } from './ProfileProvider'

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

const renderWithProviders = (ui) =>
  render(
    <ProfileProvider>
      <ContentProvider>{ui}</ContentProvider>
    </ProfileProvider>,
  )

const setupProfile = (progress = DEFAULT_PROGRESS) => {
  localStorage.setItem(
    PROFILES_KEY,
    JSON.stringify({
      version: 1,
      profiles: [{ id: '1', name: 'Kid', progress, badges: [] }],
      selectedId: '1',
    }),
  )
}

afterEach(() => {
  jest.restoreAllMocks()
  cleanup()
  localStorage.clear()
  delete global.fetch
})

describe('ContentProvider fetch handling', () => {
  it('loads week data successfully', async () => {
    setupProfile()
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ language: ['hi'], mathWindowStart: 0, encyclopedia: [] }),
    })

    renderWithProviders(<TestConsumer />)

    await waitFor(() => expect(screen.getByTestId('language')).toBeInTheDocument())
    expect(screen.getByTestId('language')).toHaveTextContent('hi')
  })

  it('handles fetch failure', async () => {
    setupProfile()
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 404 })

    renderWithProviders(<TestConsumer />)

    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument())
    expect(screen.getByTestId('error')).toHaveTextContent('404')
  })
})

describe('progress version handling', () => {

  it('loads stored progress when version matches', () => {
    setupProfile({ version: 1, week: 5, day: 6, session: 2, streak: 0 })

    renderWithProviders(<ProgressConsumer />)

    expect(screen.getByTestId('progress')).toHaveTextContent('5')
  })

  it('resets progress when version mismatches', () => {
    setupProfile({ version: 0, week: 5, day: 6, session: 2, streak: 0 })

    renderWithProviders(<ProgressConsumer />)

    expect(screen.getByTestId('progress')).toHaveTextContent('1')
  })

  it('migrates legacy progress on first run', () => {
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({ version: 1, week: 4, day: 2, session: 3 }),
    )
    localStorage.setItem(
      PROFILES_KEY,
      JSON.stringify({ version: 1, profiles: [{ id: '1', name: 'Kid', badges: [] }], selectedId: '1' }),
    )

    renderWithProviders(<ProgressConsumer />)

    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.week).toBe(4)
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull()
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
    setupProfile({ version: 1, week: 3, day: 4, session: 2, streak: 0 })

    renderWithProviders(<PrevConsumer />)

    expect(screen.getByTestId('week')).toHaveTextContent('3')
    fireEvent.click(screen.getByText('prev'))
    expect(screen.getByTestId('week')).toHaveTextContent('2')
    expect(screen.getByTestId('day')).toHaveTextContent('1')
    expect(screen.getByTestId('session')).toHaveTextContent('1')
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.week).toBe(2)
    expect(stored.profiles[0].progress.day).toBe(1)
    expect(stored.profiles[0].progress.session).toBe(1)
  })
})

describe('jumpToWeek', () => {
  const JumpConsumer = () => {
    const { progress, jumpToWeek } = useContent()
    return (
      <div>
        <span data-testid="week">{progress.week}</span>
        <span data-testid="day">{progress.day}</span>
        <span data-testid="session">{progress.session}</span>
        <button type="button" onClick={() => jumpToWeek(4)}>
          jump
        </button>
      </div>
    )
  }

  it('jumps to given week and resets progress', () => {
    setupProfile({ version: 1, week: 2, day: 3, session: 2, streak: 0 })

    renderWithProviders(<JumpConsumer />)

    fireEvent.click(screen.getByText('jump'))
    expect(screen.getByTestId('week')).toHaveTextContent('4')
    expect(screen.getByTestId('day')).toHaveTextContent('1')
    expect(screen.getByTestId('session')).toHaveTextContent('1')
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.week).toBe(4)
    expect(stored.profiles[0].progress.day).toBe(1)
    expect(stored.profiles[0].progress.session).toBe(1)
  })

  it('warns when week is out of range', () => {
    const Invalid = () => {
      const { progress, jumpToWeek } = useContent();
      return (
        <div>
          <span data-testid="week-invalid">{progress.week}</span>
          <button type="button" onClick={() => jumpToWeek(TOTAL_WEEKS + 1)}>
            bad
          </button>
        </div>
      );
    };

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    setupProfile()

    renderWithProviders(<Invalid />);

    fireEvent.click(screen.getByText('bad'));
    expect(screen.getByTestId('week-invalid')).toHaveTextContent('1');
    expect(warnSpy).toHaveBeenCalledWith(
      `Week ${TOTAL_WEEKS + 1} is out of range (1-${TOTAL_WEEKS})`,
    );

    warnSpy.mockRestore();
  });
})

describe('reset helpers', () => {
  it('resetToday sets session to 1', () => {
    setupProfile({ version: 1, week: 2, day: 3, session: 2, streak: 0 })

    const ResetConsumer = () => {
      const { progress, resetToday } = useContent()
      return (
        <div>
          <span data-testid="session">{progress.session}</span>
          <button type="button" onClick={resetToday}>
            reset
          </button>
        </div>
      )
    }

    renderWithProviders(<ResetConsumer />)

    fireEvent.click(screen.getByText('reset'))
    expect(screen.getByTestId('session')).toHaveTextContent('1')
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.session).toBe(1)
  })

  it('resetAll clears all progress after confirmation', () => {
    setupProfile({ version: 1, week: 3, day: 2, session: 3, streak: 0 })

    const AllConsumer = () => {
      const { progress, resetAll } = useContent()
      return (
        <div>
          <span data-testid="week">{progress.week}</span>
          <button type="button" onClick={resetAll}>
            reset all
          </button>
        </div>
      )
    }

    window.confirm = jest.fn(() => true)

    renderWithProviders(<AllConsumer />)

    fireEvent.click(screen.getByText('reset all'))
    expect(screen.getByTestId('week')).toHaveTextContent('1')
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.week).toBe(1)
    expect(window.confirm).toHaveBeenCalled()
  })
})

describe('completeSession final week', () => {
  it('keeps week at TOTAL_WEEKS and logs message', () => {
    setupProfile({ version: 1, week: TOTAL_WEEKS, day: 7, session: 3, streak: 5 })

    const Consumer = () => {
      const { progress, completeSession } = useContent()
      return (
        <div>
          <span data-testid="week">{progress.week}</span>
          <button type="button" onClick={completeSession}>
            do
          </button>
        </div>
      )
    }

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    renderWithProviders(<Consumer />)

    fireEvent.click(screen.getByText('do'))
    expect(screen.getByTestId('week')).toHaveTextContent(String(TOTAL_WEEKS))
    const stored = JSON.parse(localStorage.getItem(PROFILES_KEY))
    expect(stored.profiles[0].progress.week).toBe(TOTAL_WEEKS)
    expect(logSpy).toHaveBeenCalledWith('Course Finished!')

    logSpy.mockRestore()
  })
})
