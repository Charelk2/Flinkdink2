import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './screens/Home'
import Session from './screens/Session'
import { ContentProvider } from './contexts/ContentProvider'
import './App.css'

const App = () => (
  <BrowserRouter>
    <ContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
      </Routes>
    </ContentProvider>
  </BrowserRouter>
)

export default App
