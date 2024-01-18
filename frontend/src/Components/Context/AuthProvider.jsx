import React, {useState, createContext, useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  const signup = async(name, email, password, confirmPassword) => {
    const response = await axios.post('http://127.0.0.1:5000/user/signup', {
      name,
      email,
      password,
      confirmPassword
    })

    setUser(response.data)
  }

  const login = async(email, password) => {
    const response = await axios.post('http://127.0.0.1:5000/user/login', {
      email,
      password
    })
    console.log(response)
    setUser(response.data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  const logout = async() => {
    localStorage.removeItem('user')
    const response = await axios.get('http://127.0.0.1:5000/user/logout')
    setUser(null)
  }

  useEffect(() => {
     function userState(){
      const data = localStorage.getItem('user')
      if (data){
        setUser(JSON.parse(data))
        navigate('/')
      } else {
        setUser(null)
      }
    }
    userState()
  }, [])

  const value = {user, signup, login, logout}

  return (
    <AuthContext.Provider value = {value}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}

export default AuthProvider