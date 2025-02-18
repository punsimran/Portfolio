import {BrowserRouter , Routes, Route} from 'react-router-dom'
import './App.css'
import Header from './components/header/header'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import Contact from './pages/contact/contact'
import Aboutpage from './pages/Aboutpage'
import Portfolio from './pages/portfolio/Portfolio'
import Blog from './pages/blog/blog'

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Header />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='about' element={<Aboutpage />}/>
          <Route path='portfolio' element={<Portfolio />}/>
          <Route path='blog' element={<Blog />}/>
          <Route path='contact' element={<Contact />}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
