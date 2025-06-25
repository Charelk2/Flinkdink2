import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { fetchWeekData } from '../utils/fetchWeek'
import { calculateWeekPercent } from '../utils/progress'
import {
  useProfiles,
  DEFAULT_PROGRESS,
  PROGRESS_VERSION,
} from './ProfileProvider'

export const TOTAL_WEEKS = 41

const ContentContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return useContext(ContentContext)
}

export const ContentProvider = ({ children }) => {
  const { selectedProfile, unlockBadge, setProgress } = useProfiles();
  const progress = selectedProfile?.progress || DEFAULT_PROGRESS;
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
    if (!selectedProfile) return
    const data = { ...p, version: PROGRESS_VERSION }
    setProgress(data)
  }

  const completeSession = () => {
    let {
      week, day, session, streak,
    } = progress
    if (session < 3) {
      session += 1
    } else {
      if (day < 7) {
        day += 1
        session = 1
      } else if (week < TOTAL_WEEKS) {
        week += 1
        day = 1
        session = 1
      } else {
        console.log('Course Finished!')
        // keep week/day/session at final values
      }
      streak += 1
      if (streak === 1) unlockBadge('first-day')
      if (streak === 5) unlockBadge('five-day-streak')
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
    } else {
      console.warn(`Week ${week} is out of range (1-${TOTAL_WEEKS})`)
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

  const weekPercent = calculateWeekPercent(progress.week, TOTAL_WEEKS)

  return (
    <ContentContext.Provider
      value={{
        progress,
        weekPercent,
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
