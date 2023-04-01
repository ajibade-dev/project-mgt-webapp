import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//styles and images
import './Navbar.css'
import Dev from '../assets/dev.png'

import React from 'react'

export default function Navbar() {
  const {logout, isPending} = useLogout()
  const{ user} = useAuthContext()

  return (
    <div className="navbar">
        <ul>
            <li className='logo'>
                <Link to='/'>
                <img src={Dev} alt="paul's logo"
                />
                </Link>
            </li>

            {!user &&<li><Link to='/login'>Login</Link></li>}
            {!user &&<li><Link to='/signup'>Signup</Link></li>}
           { user && <li>
               {!isPending && <button className='btn' onClick={logout}>Logout</button>}
               {isPending && <button className='btn' disabled>Logging Out...</button>}
            </li>}
        </ul>
    </div>
  )
}
