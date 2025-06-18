import { createContext, useContext, useEffect, useState } from 'react'

const PROGRESS_KEY = 'progress-v1'
const DEFAULT_PROGRESS = { week: 1, day: 1, session: 1 }

const ContentContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  return useContext(ContentContext)
}

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(PROGRESS_KEY))
    if (stored && stored.week && stored.day && stored.session) return stored
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

  useEffect(() => {
    const loadWeek = async () => {
      setLoading(true)
      setError(null)
      const id = String(progress.week).padStart(3, '0')
      try {
        const res = await fetch(`/weeks/week${id}.json`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setWeekData(data)
      } catch (err) {
        console.error('Failed to load week data', err)
        setWeekData(null)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadWeek()
  }, [progress.week])

  const saveProgress = (p) => {
    setProgress(p)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p))
  }

  const completeSession = () => {
    let { week, day, session } = progress
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
    }
    saveProgress({ week, day, session })
  }

  return (
    <ContentContext.Provider value={{ progress, weekData, loading, error, completeSession }}>
      {children}
    </ContentContext.Provider>
  )
}
