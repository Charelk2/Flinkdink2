import { useContent } from '../contexts/ContentProvider'
import LoadingSkeleton from '../components/LoadingSkeleton'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProgressStrip from '../components/ProgressStrip'
import ThemeList from '../components/ThemeList'
import CTAButton from '../components/CTAButton'

const Home = () => {
  const { progress, loading, previousWeek } = useContent()
  if (loading) return <LoadingSkeleton />
  const completed = progress.session - 1
  const titles = ['Language', 'Math', 'Knowledge']

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex flex-col items-center flex-1 p-4 space-y-8 w-full max-w-md mx-auto pt-8">
        <Hero
          headline="FlinkDink Flashcards"
          tagline={`Week ${progress.week} \u2013 Day ${progress.day}`}
        />
        {progress.streak >= 2 && (
          <span className="badge">🔥 {progress.streak}-day streak</span>
        )}
        <ProgressStrip
          week={progress.week}
          day={progress.day}
          session={progress.session}
          completedSessions={completed}
        />
        <ThemeList languageTheme={titles[0]} mathRange={titles[1]} knowledgeTheme={titles[2]} />
        <CTAButton to="/session">
          Start Week {progress.week} • Day {progress.day} • Session {progress.session}
        </CTAButton>
        {progress.week > 1 && (
          <button type="button" onClick={previousWeek} className="btn">
            ← Previous Week
          </button>
        )}
      </main>
    </div>
  )
}

export default Home
