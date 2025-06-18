import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import ProgressStrip from '../components/ProgressStrip'
import ThemeList from '../components/ThemeList'
import CTAButton from '../components/CTAButton'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { useContent } from '../contexts/ContentProvider'

const Home = () => {
  const { loading } = useContent()
  if (loading) return <LoadingSkeleton />
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-grow flex flex-col justify-center space-y-8 w-11/12 md:w-4/5 lg:max-w-md mx-auto">
        <Hero />
        <ProgressStrip />
        <ThemeList />
        <CTAButton />
      </main>
    </div>
  )
}

export default Home
