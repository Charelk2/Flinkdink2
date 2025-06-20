import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { fetchWeekData } from '../utils/fetchWeek'

const PROGRESS_VERSION = 1
const PROGRESS_KEY = 'progress-v1'
export const TOTAL_WEEKS = 46
const DEFAULT_PROGRESS = {
  version: PROGRESS_VERSION,
  week: 1,
  day: 1,
  session: 1,
  streak: 0,
}

const ContentContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return useContext(ContentContext)
}

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY))
    if (
      stored &&
      stored.version === PROGRESS_VERSION &&
      stored.week &&
      stored.day &&
      stored.session
    ) {
      return { ...DEFAULT_PROGRESS, ...stored }
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_PROGRESS
}

export const ContentProvider = ({ children }) => {
  const [progress, setProgress] = useState(loadProgress())
  const [weekData, setWeekData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadWeek = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeekData(progress.week)
      setWeekData(data)
    } catch (err) {
      console.error('Failed to load week data', err)
      setWeekData(null)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [progress.week])

  useEffect(() => {
    loadWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.week])

  const saveProgress = (p) => {
    const data = { ...p, version: PROGRESS_VERSION }
    setProgress(data)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data))
  }

  const completeSession = () => {
    let {
      week, day, session, streak,
    } = progress
    if (session < 3) {
      session += 1
    } else {
      session = 1
      if (day < 7) {
        day += 1
      } else {
        day = 1
        week += 1
      }
      streak += 1
    }
    saveProgress({ week, day, session, streak })
  }

  const previousWeek = () => {
    if (progress.week > 1) {
      saveProgress({ week: progress.week - 1, day: 1, session: 1 })
    }
  }

  const jumpToWeek = (week) => {
    if (week >= 1 && week <= TOTAL_WEEKS) {
      saveProgress({ week, day: 1, session: 1 })
    }
  }

  const resetToday = () => {
    saveProgress({ ...progress, session: 1 })
  }

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      saveProgress(DEFAULT_PROGRESS)
    }
  }

  return (
    <ContentContext.Provider
      value={{
        progress,
        weekData,
        loading,
      error,
      completeSession,
      loadWeek,
      previousWeek,
      jumpToWeek,
      resetToday,
      resetAll,
    }}
    >
      {children}
    </ContentContext.Provider>
  )
}
