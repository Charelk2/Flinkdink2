import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Session from './screens/Session'
import Dashboard from './screens/Dashboard'
import { ContentProvider } from './contexts/ContentProvider'
import ErrorBanner from './components/ErrorBanner'
import './App.css'

const App = () => (
  <BrowserRouter>
    <ContentProvider>
      <ErrorBanner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ContentProvider>
  </BrowserRouter>
)

export default App
