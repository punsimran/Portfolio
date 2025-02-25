import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import React from "react";
import './App.css'
import Header from './components/header/header'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Contact from './pages/contact/Contact'
import Aboutpage from './pages/Aboutpage'
import Portfolio from './pages/portfolio/Portfolio'
import Blog from './pages/blog/Blog'
import { Toaster } from 'react-hot-toast';
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin';
import PrivateRoute from './components/PrivateRoute';
import { useState, useEffect } from 'react';
import BlogDetails from './pages/BlogDetails';
// import { WavyContainer } from 'react-wavy-transitions';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      {/* <WavyContainer /> */}
      <Toaster/>
      <Navbar />
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<Aboutpage />}></Route>
          <Route path='/portfolio' element={<Portfolio />} ></Route>
          <Route path='/blog' element={<Blog />} ></Route>
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path='/contact' element={<Contact />} ></Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Admin onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
    )
}

export default App
