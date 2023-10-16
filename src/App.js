import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
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
      <HeroSection slides={slides}/>

      
    </>
    
  );
}

export default App;
