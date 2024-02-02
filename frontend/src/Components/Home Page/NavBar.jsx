import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import '../Styles/nav.css'

function NavBar() {
    const { user, logout } = useAuth()
    return (
        <nav>
            <div className='menu'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/allPlans'>Plans</Link></li>
                    {user ? (
                        <>
                            <li><Link to='/profilePage'>{user.data.name}</Link></li>
                            <li><Link onClick={logout}>Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/signup'>Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar