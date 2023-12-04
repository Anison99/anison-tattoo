import React from 'react';
import '../css/Footer.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterest, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../language/LanguageContext.js';

function Footer() {
  const { t, language } = useLanguage();
  return (
    <div className='footer'>
      <div className='sb__footer section_padding'>
        <div className='sb__footer-links'>
          <div className='sb_footer-links-div'>
            <h4>{t('contact')}</h4> 
            <p>
              <FontAwesomeIcon icon={faPhone} className='icons-custom' /> {t('phone')}: +48 123 456 789
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className='icons-custom' /> Email: kontakt@example.com
            </p>
          </div>
          <div className='sb_footer-links-logo'>
            <img src='https://i.imgur.com/qTGxBzc.png' alt='Logo' className='footer-logo' />
          </div>
          <div className='sb_footer-links-div'>
            <h4>{t('media')}</h4>
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
          <p>&copy; 2023 Anison Tattoo. {t('credits')}</p>
          <p>
            <a href="/regulamin">{t('reg')}</a> | <a href="mailto:info@example.com">{t('contact')}</a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Footer;
