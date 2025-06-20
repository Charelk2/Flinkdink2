import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContent, TOTAL_WEEKS } from '../contexts/ContentProvider'
import NavBar from '../components/NavBar'
import DashboardHeader from '../components/DashboardHeader'

const PIN = '1234'

const Dashboard = () => {
  const [entered, setEntered] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [confirmWeek, setConfirmWeek] = useState(null)
  const navigate = useNavigate()

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
  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

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
      <table className="progress-table w-full table-fixed text-center text-xs" aria-label="Weekly progress">
        <thead>
          <tr>
            {days.map((d) => (
              <th key={d}>Day {d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((m, i) => (
            <tr key={m}>
              {days.map((d) => (
                <td
                  key={d}
                  className={isComplete(d, i) ? 'bg-green-400' : 'bg-gray-200'}
                  data-testid={`day${d}-module${i}`}
                >
                  {m}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-semibold pt-4">Weeks</h2>
      <div className="grid grid-cols-7 sm:grid-cols-13 gap-1 text-center" data-testid="week-grid">
        {weeks.map((w) => (
          <button
            key={w}
            type="button"
            data-testid={`week-btn-${w}`}
            className={`border p-1 rounded hover:bg-indigo-100 cursor-pointer ${w === progress.week ? 'bg-indigo-200 font-bold' : ''}`}
            aria-current={w === progress.week ? 'true' : undefined}
            onClick={() => setConfirmWeek(w)}
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
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2" data-testid="action-grid">
        <button type="button" onClick={resetToday} className="btn w-full sm:w-auto">
          🔄 Reset Today
        </button>
        <button type="button" onClick={resetAll} className="btn w-full sm:w-auto">
          🗑️ Reset All
        </button>
        <button type="button" onClick={() => window.print()} className="btn w-full sm:w-auto">
          ⭐ Print Star Chart
        </button>
        <button type="button" onClick={() => window.print()} className="btn w-full sm:w-auto">
          📜 Print Certificate
        </button>
      </div>
      {confirmWeek !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" data-testid="week-confirm">
          <div className="bg-white p-4 rounded space-y-2 text-center shadow">
            <p>Start Week {confirmWeek}?</p>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  jumpToWeek(confirmWeek)
                  setConfirmWeek(null)
                  navigate('/session')
                }}
              >
                Yes
              </button>
              <button type="button" className="btn" onClick={() => setConfirmWeek(null)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

export default Dashboard
