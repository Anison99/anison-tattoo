import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import Artworks from './components/Artworks';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Footer from './components/Footer';


import slides from './models/mock.json';
import slides2 from './models/artworks.json';

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
