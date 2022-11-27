import {Routes, Route} from 'react-router-dom'
import {Landing, Home, Dashboard, Admin, Analytics} from './page';
import { useState } from 'react'
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [user, setUser] = useState(null);

  const login = () => setUser({id: 1, user: "john", permission: [''], roles: ['admin']})
  const logout = () => setUser(null);

  return (
    <>
      <Navbar />
      {user
        ? <button onClick={logout}>Logout</button>
        : <button onClick={login}>Login</button>
      }
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoute isAllow={!!user} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/analytics" element={
          <ProtectedRoute isAllow={!!user && user.permission.includes('analize')} redirectTo="/home">
            <Analytics />
          </ProtectedRoute>} 
        />
        <Route path="/admin" element={
          <ProtectedRoute isAllow={!!user && user.roles.includes('admin')} redirectTo="/home">
            <Admin />
          </ProtectedRoute>} 
        />
        </Routes>
    </>
  )
}

export default App
