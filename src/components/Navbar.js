import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { Button } from './Button';
import myLogo from '../images/logo96.png';
import SocialMedia from './SocialMedia';
import { useLanguage } from '../language/LanguageContext.js';
import i18n from '../language/i18n.js'; // Dodaj import i18n

const Navbar = () => {
  const { t, changeLanguage } = useLanguage(); // Dodaj import t

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLanguageChange = (language) => {
    console.log('Changing language to:', language);
    changeLanguage(language);
  };

  useEffect(() => {
    const handleLanguageChangeOnStorage = () => {
      const lang = localStorage.getItem('i18nextLng');
      if (lang && i18n.language !== lang) {
        changeLanguage(lang);
      }
    };

    window.addEventListener('storage', handleLanguageChangeOnStorage);

    return () => {
      window.removeEventListener('storage', handleLanguageChangeOnStorage);
    };
  }, [changeLanguage]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/');
    window.location.replace('/');
  };

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const checkButtonSize = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    checkButtonSize();
    window.addEventListener('resize', checkButtonSize);

    return () => {
      window.removeEventListener('resize', checkButtonSize);
    };
  }, []);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };

    checkLoggedInStatus();

    window.addEventListener('storage', () => {
      checkLoggedInStatus();
      navigate('/');
    });

    return () => {
      window.removeEventListener('resize', checkButtonSize);
      window.removeEventListener('storage', checkLoggedInStatus);
    };
  }, [navigate]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={myLogo} alt="My Logo" />
            
          </Link>
          <SocialMedia />
          <div className="language-selector">
            <button className="language-button" onClick={() => changeLanguage('pl')}>
              PL
            </button>
            <button className="language-button" onClick={() => changeLanguage('en')}>
              EN
            </button>
          </div>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to="/about" className='nav-links' onClick={closeMobileMenu}>
                {t('aboutUs')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/artworks" className='nav-links' onClick={closeMobileMenu}>
                {t('artworks')}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/contact" className='nav-links' onClick={closeMobileMenu}>
                {t('contact')}
              </Link>
            </li>
            <li className='nav-item'>
              {loggedIn ? (
                <span className='nav-links' onClick={() => { navigate('/profile'); closeMobileMenu(); }}>
                  {t('profile')}
                </span>
              ) : (
                <Link to="/login" className='nav-links' onClick={closeMobileMenu}>
                  {t('login')}
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {loggedIn && (
                <Button buttonStyle='btn--outline' onClick={handleLogout}>
                  {t('logout')}
                </Button>
              )}
            </li>
            {button && !loggedIn && (
            <Button buttonStyle='btn--outline' linkTo="/register">
              {t('register')}
            </Button>
          )}
          </ul>
         
        </div>
      </nav>
    </>
  );
}

export default Navbar;
