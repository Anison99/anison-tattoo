import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
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
      
    </>
    
  );
}

export default App;
