import { Route, Routes } from 'react-router-dom'
import { MoodsPage } from './pages'
import LoginForm from './components/LoginForm'
import RegisterPage from './pages/RegisterPage'
import './font.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='moods'>
        <Route index element={<MoodsPage />} />
      </Route>
    </Routes>
  )
}
export default App
