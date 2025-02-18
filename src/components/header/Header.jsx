
import React from 'react'
import "./header.css";
import logo from '../../assets/logo.png';

const Header = () => {

  return (
        <header className='header'>
            <nav className='nav_h container'>
                <a href="/" className='nav__logo'>
                    <img src={logo} alt="logo" />
                </a>
            </nav>
        </header>
  )
}

export default Header
