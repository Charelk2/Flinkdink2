import { useState } from 'react'
import { useContent } from '../contexts/ContentProvider'
import NavBar from '../components/NavBar'
import DashboardHeader from '../components/DashboardHeader'

const PIN = '1234'

const Dashboard = () => {
  const [entered, setEntered] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const {
    progress,
    weekData,
    loading,
    error,
    jumpToWeek,
    resetToday,
    resetAll,
  } = useContent()


  if (!unlocked) {
    return (
      <>
        <NavBar />
        <div className="p-4 space-y-2 text-center pt-20">
          <h1 className="text-xl font-bold">Enter PIN</h1>

        <label htmlFor="pin" className="sr-only">PIN</label>
        <input
          id="pin"

          type="password"
          className="border p-2 w-full max-w-xs"
          value={entered}
          onChange={(e) => setEntered(e.target.value)}
        />
        <button
          type="button"
          className="btn"
          onClick={() => entered === PIN && setUnlocked(true)}
        >
          Unlock
        </button>
        </div>
      </>
    )
  }


  const days = Array.from({ length: 7 }, (_, i) => i + 1)
  const modules = ['L', 'M', 'E']
  const weeks = Array.from({ length: 52 }, (_, i) => i + 1)

  const isComplete = (day, modIndex) => {
    if (day < progress.day) return true
    if (day > progress.day) return false
    return modIndex < progress.session - 1
  }


  return (
    <>
      <NavBar />
      <DashboardHeader />
      <div className="p-4 space-y-4 pt-20">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-7 gap-2 text-center text-sm">

        {days.map((d) => (
          <div key={d} className="border p-2 space-y-1">
            <div className="font-bold">Day {d}</div>
            {modules.map((m, i) => (
              <div
                key={i}
                className={`h-4 ${isComplete(d, i) ? 'bg-green-400' : 'bg-gray-200'}`}
                data-testid={`day${d}-module${i}`}
              >
                {m}
              </div>
            ))}

          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold pt-4">Weeks</h2>
      <div className="grid grid-cols-7 sm:grid-cols-13 gap-1 text-center" data-testid="week-grid">
        {weeks.map((w) => (
          <button
            key={w}
            type="button"
            data-testid={`week-btn-${w}`}
            className={`border p-1 rounded ${w === progress.week ? 'bg-indigo-200' : ''}`}
            onClick={() => jumpToWeek(w)}
          >
            {w}
          </button>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p className="text-red-600">Failed to load</p>}
      {!loading && !error && !weekData && <p>empty</p>}
      {!loading && weekData && (
        <div className="pt-2 text-sm" data-testid="week-info">
          <div>Language: {weekData.language.slice(0, 3).join(', ')}</div>
          <div>Math start: {weekData.mathWindowStart}</div>
          <div>Cards: {weekData.encyclopedia.length}</div>
        </div>
      )}
      <div className="space-x-2">
        <button type="button" onClick={resetToday} className="btn">
          Reset Today
        </button>
        <button type="button" onClick={resetAll} className="btn">
          Reset All
        </button>
        <button type="button" onClick={() => window.print()} className="btn">
          Print Star Chart
        </button>
        <button type="button" onClick={() => window.print()} className="btn">
          Print Certificate
        </button>
      </div>
      </div>
    </>
  )
}

export default Dashboard
