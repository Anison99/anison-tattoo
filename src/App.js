import React from 'react';
import './css/App.css';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Artworks from './components/Artworks';

import slides from './assets/mock.json';
import slides2 from './assets/artworks.json';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; {/* teraz zamiast Switch używa się Routes */}

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact /> {/* routing do strony HOME */}
          <Route path='/#about' cmoponent={AboutUs}/>
        </Routes>
      </Router>  
      <HeroSection slides={slides}/>
      <AboutUs/>
      <Artworks slides2={slides2}/>

      
    </>
    
  );
}

export default App;
