import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Artworks from './components/Artworks';
import Contact from './components/Contact';
import Footer from './components/Footer';

import slides from './assets/mock.json';
import slides2 from './assets/artworks.json';

function App() {
  const [activeComponent, setActiveComponent] = useState('hero');

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <Router>
      <Navbar onComponentChange={handleComponentChange} />
      <Routes>
        <Route path="/" element={<HeroSection slides={slides} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/artworks" element={<Artworks slides2={slides2} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
