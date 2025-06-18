import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Session from './screens/Session'
import { ContentProvider } from './contexts/ContentProvider'
import Header from './components/Header'
import ErrorBanner from './components/ErrorBanner'
import './App.css'

const App = () => (
  <BrowserRouter>
    <ContentProvider>
      <Header />
      <div className="pt-16">
        <ErrorBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/session" element={<Session />} />
        </Routes>
      </div>
    </ContentProvider>
  </BrowserRouter>
)

export default App
