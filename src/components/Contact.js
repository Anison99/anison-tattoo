import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Contact.css';
import Map from './Map';
import { useLanguage } from '../language/LanguageContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const { t, language } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Przykładowe dane kontaktowe
  const contactData = {
    phone: '+48 123 456 789',
    email: 'kontakt@example.com',
    address: 'ul. Przykładowa 123, 00-000 Warszawa',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
  };

  useEffect(() => {
    // Tutaj umieść logikę sprawdzającą stan zalogowania użytkownika
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div data-aos="fade-down" data-aos-duration="2000">
      <h1 className='about-title' alt='about-us'>{t('contactHead')}</h1>
      <hr></hr>
      <div className='contact-section'>
        {/* Dane kontaktowe */}
        <div className='contact-details'>
          <h2>{t('contact')}</h2>
          <div className='contact-data'>
            <p>
              <FontAwesomeIcon icon={faPhone} /> {contactData.phone}
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> {contactData.email}
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarker} /> {contactData.address}
            </p>
            <hr style={{
              border: 'none',
              height: '2px',
              backgroundColor: '#FFFFFF',
            }}></hr>
          </div>
          {!isLoggedIn && (
            <div className="login-section">
            <p className="login-message">{t('contactMessage')}</p>
            <Link to="/login">
              <button className="login-button">{t('login')}</button>
            </Link>
            <Link to="/register">
              <button className="register-button">{t('register')}</button>
            </Link>
          </div>
          )}
        </div>
        {/* Mapa lokalizacji studia */}
        <div className='map-section'>
          <Map />
        </div>
      </div>
    </div>
  );
}

export default Contact;
