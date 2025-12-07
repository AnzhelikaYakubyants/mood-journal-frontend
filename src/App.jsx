import { Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  )
}
export default App