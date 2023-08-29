import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContextProvider'
import PropTypes from 'prop-types'

//Components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'


function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to='/login'/>
    }

    return children
  }

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='login' element={<Login/>} />
        <Route path='signup' element={<Signup/>} />
      </Route>
    </Routes>
  )
}

App.propTypes = {
  children : PropTypes.any
}

export default App
