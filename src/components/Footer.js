import React from 'react';
import '../css/Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterest, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className='footer'>
      <div className='sb__footer section_padding'>
        <div className='sb__footer-links'>
          <div className='sb_footer-links-div'>
            <h4 style={{ color: 'white', fontSize: '20px' }}>Kontakt</h4> 
            <p>
              <FontAwesomeIcon icon={faPhone} className='icons-custom' /> Telefon: +48 123 456 789
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className='icons-custom' /> Email: kontakt@example.com
            </p>
          </div>
          <div className='sb_footer-links-logo'>
                <img src='https://i.imgur.com/qTGxBzc.png' alt='Logo' className='footer-logo' />
              </div>
          <div className='sb_footer-links-div'>
            <h4 style={{ color: 'white', fontSize: '20px' }}>Media społecznościowe</h4>
            <p>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} className='icons-custom' /> Facebook
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className='icons-custom' /> Instagram
              </a>
            </p>
            <p>
              <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faPinterest} className='icons-custom' /> Pinterest
              </a>
            </p>
            <p>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} className='icons-custom' /> TikTok
              </a>
            </p>
          </div>
        </div>
        <div className='sb__footer-copyright'>
          <p>&copy; 2023 Anison Tattoo. Wykreowane na potrzeby pracy inzynierskiej Akademii Tarnowskiej.</p>
          <p>
            <a href="/regulamin">Regulamin</a> | <a href="mailto:info@example.com">Kontakt</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
