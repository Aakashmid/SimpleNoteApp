
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Register from './pages/Register'
import Home from './pages/Home'
import Topbar from './components/Topbar'
import { useState } from 'react'

function App() {
  const [User, setUser] = useState({})
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }

  function RegisterAndLogout() {
    localStorage.clear()
    return <Register />
  }

  return (
    <>
      <header>
        <ProtectedRoute setUser={setUser}>
          <Topbar />
        </ProtectedRoute>
      </header>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
