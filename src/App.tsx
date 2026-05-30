import { Navigate, Route, Routes } from 'react-router-dom'
import WindowShell from './components/WindowShell'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'
import TacticalZone from './pages/TacticalZone'

function App() {
  return (
    <Routes>
      <Route element={<WindowShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/tactical-zone" element={<TacticalZone />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
