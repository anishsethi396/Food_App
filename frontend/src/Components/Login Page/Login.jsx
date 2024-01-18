import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import '../Styles/login.css'

function Login() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login( password, email)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-grey">
            <div className="form-container">
                <div className='h1Box'>
                    <h1 className='h1'>LOGIN</h1>
                    <div className="line"></div>
                </div>

                <div className="loginBox">
                    <div className="entryBox">
                        <div className="entryText">Email</div>
                        <input className="email input" type="email" name="Email" placeholder="Your Email" required="" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="entryBox">
                        <div className="entryText">Password</div>
                        <input className="password input" type="password" name="Password" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="loginBtn  form-button" type="submit" onClick={handleLogin}>
                        Login
                    </button>
                    <div className='otherOption'>
                        <button className=" otherbtns form-button" type="submit" >
                            <Link to="/signup" className="otherbtns">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login