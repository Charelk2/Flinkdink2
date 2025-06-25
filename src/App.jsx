import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './screens/Home'
import Session from './screens/Session'
import Dashboard from './screens/Dashboard'
import LearningHub from './screens/LearningHub'
import Progress from './screens/Progress'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import OnboardingHome from './screens/OnboardingHome'
import SelectKid from './screens/SelectKid'
import { ContentProvider } from './contexts/ContentProvider'
import { AuthProvider } from './contexts/AuthProvider'
import { ProfileProvider, useProfiles } from './contexts/ProfileProvider'
import ErrorBanner from './components/ErrorBanner'
import './App.css'

const RoutesWithProfiles = () => {
  const { profiles } = useProfiles()
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={profiles.length === 0 ? <OnboardingHome /> : <Navigate to="/select-kid" />}
      />
      <Route path="/select-kid" element={<SelectKid />} />
      <Route path="/learning-hub" element={<LearningHub />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/session" element={<Session />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <ContentProvider>
          <ErrorBanner />
          <RoutesWithProfiles />
        </ContentProvider>
      </ProfileProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
