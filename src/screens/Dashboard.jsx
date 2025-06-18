import { useState } from 'react'
import { useContent } from '../contexts/ContentProvider'

const PIN = '1234'

const Dashboard = () => {
  const [entered, setEntered] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const { progress, resetToday, resetAll } = useContent()


  if (!unlocked) {
    return (
      <div className="p-4 space-y-2 text-center">
        <h1 className="text-xl font-bold">Enter PIN</h1>

        <label htmlFor="pin" className="sr-only">PIN</label>
        <input
          id="pin"

          type="password"
          className="border p-2"
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
    )
  }


  const days = Array.from({ length: 7 }, (_, i) => i + 1)
  const modules = ['L', 'M', 'E']

  const isComplete = (day, modIndex) => {
    if (day < progress.day) return true
    if (day > progress.day) return false
    return modIndex < progress.session - 1
  }


  return (
    <div className="p-4 space-y-4">
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
  )
}

export default Dashboard
