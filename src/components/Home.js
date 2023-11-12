import React from 'react'
import AboutUs from './AboutUs';
import Artworks from './Artworks';
import Contact from './Contact';

import slides2 from '../models/artworks.json';
function Home() {
  return (
    <div>
      <AboutUs/>
      <Artworks slides2={slides2} />
      <Contact />
    </div>
  )
}

export default Home
