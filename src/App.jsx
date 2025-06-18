import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Session from './screens/Session'
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import { ContentProvider } from './contexts/ContentProvider'
import { AuthProvider } from './contexts/AuthProvider'
import ErrorBanner from './components/ErrorBanner'
import './App.css'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ContentProvider>
        <ErrorBanner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/session" element={<Session />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ContentProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
