import React, { useState } from 'react';
import {
  FaHome,
  FaUser,
  FaFolderOpen,
  FaEnvelopeOpen,
  // FaBriefcase,
  // FaGraduationCap,
  // FaCode,
  FaBlog,
} from 'react-icons/fa';
// import { links } from '../data';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const links = [
    {
      id: 1,
      name: 'Home',
      icon: <FaHome className='nav__icon' />,
      path: '/',
    },
  
    {
      id: 2,
      name: 'About',
      icon: <FaUser className='nav__icon' />,
      path: '/about',
    },
  
    {
      id: 3,
      name: 'Portfolio',
      icon: <FaFolderOpen className='nav__icon' />,
      path: '/portfolio',
    },
    {
      id: 4,
      name: 'Blog',
      icon: <FaBlog className='nav__icon' />,
      path: '/blog',
    },
    {
      id: 5,
      name: 'Contact',
      icon: <FaEnvelopeOpen className='nav__icon' />,
      path: '/contact',
    },
  ];
  return (
    <nav className='nav'>
      <div className="nav__menu">
        <ul className="nav__list">
            {links.map(({name,icon,path},index) => {
              return(
                <li className='nav__item' key={index}>
                  <NavLink to={path} className='nav__link'>
                    {icon}
                    <h3 className='nav__name'>{name}</h3>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="nav__toggle"></div>
         <span></span>
         <span></span>
         <span></span>
         <span></span>
    </nav>
  )
}

export default Navbar              