import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage, MoodsPage, MoodDetailPage } from './pages'
import RegisterPage from './pages/RegisterPage'
import './font.css'

function App() {
  // Sets the browser tab title when the application mounts.
  useEffect(() => {
    document.title = 'Mood Journal 📔'
  }, [])
  return (
    // Defines application routes.
    <Routes>
      {/* Home page */}
      <Route index element={<HomePage />} />
      {/* User registration page */}
      <Route path='/register' element={<RegisterPage />} />
      <Route path='moods'>
        {/* Mood entries page */}
        <Route index element={<MoodsPage />} />
        {/* Single mood detail page */}
        <Route path=':id' element={<MoodDetailPage />} />
      </Route>
    </Routes>
  )
}
export default App
