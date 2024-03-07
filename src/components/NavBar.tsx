import React from 'react'
import logo from "../assets/logo.svg"
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <nav className="navbar">
      {/* <Link to = "/" className='navbar-brand'> 
      <img src={logo} alt="logo" />
      </Link> */}
      <div>
        <h3>Hello from Navbar</h3>
        <ul className='nav-list'>
            <li><a href='/' className='nav-link'>Home</a></li>
            <li><a href='/recipes' className='nav-link'>Recipes</a></li>
            
        </ul>
      </div>

    
    </nav>
  )
}

export default NavBar