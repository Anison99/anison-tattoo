import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialMedia from './components/SocialMedia';
import slides from './assets/mock.json';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; {/* teraz zamiast Switch używa się Routes */}

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact /> {/* routing do strony HOME */}
        </Routes>
      </Router>
      <SocialMedia/>
      <HeroSection slides={slides}/>

      
    </>
    
  );
}

export default App;
