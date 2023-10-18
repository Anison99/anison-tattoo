import React from 'react';
import '../css/AboutUs.css';

import artist1 from '../images/artist1.png';

function AboutUs() {
  return (
    <div data-aos="fade-down" data-aos-duration="2000">
      <h1 className='about-title' alt='about-us'>O NAS</h1>
      <hr></hr>
      <div className='container'>
        <img src='https://i.imgur.com/BJnKWzw.png' alt='artist1' className='rounded-image'/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nibh erat, euismod pellentesque aliquet quis, dapibus pellentesque leo. Donec pharetra nisi ipsum, at porttitor nulla convallis a. Nam placerat diam tortor, eu pharetra libero congue ut. In vel molestie dui, vel interdum elit. Nullam viverra ligula tortor, nec viverra mi congue id. In sed sem nisi. Praesent vehicula, sapien a rutrum dapibus, urna nibh rhoncus magna, eu auctor orci sem vel lectus. Nullam at tincidunt risus. Mauris tempus euismod urna, posuere mattis diam ultrices et. Integer quis consequat massa, a mattis diam. Suspendisse potenti. Ut congue nisi rutrum lorem euismod dignissim. Donec aliquam quam tortor, sed lobortis nibh aliquam fermentum.</p>
      </div>
    </div>
  )
}

export default AboutUs
