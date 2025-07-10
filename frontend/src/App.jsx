import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SignUp />} />
    </Routes>
  )
}

export default App