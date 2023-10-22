import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import '../css/Navbar.css';
import myLogo from '../images/logo96.png';
import SocialMedia from './SocialMedia';
import { Link } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={myLogo} alt="My Logo" />
            <SocialMedia />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to="/about" className='nav-links' onClick={closeMobileMenu}>
                O nas
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/artworks" className='nav-links' onClick={closeMobileMenu}>
                Nasze prace
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/contact" className='nav-links' onClick={closeMobileMenu}>
                Kontakt
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/login" className='nav-links' onClick={closeMobileMenu}>
                Zaloguj
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/register' className='nav-links-mobile' onClick={closeMobileMenu}>
                Zarejestruj
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle='btn--outline' linkTo="/register">
              Zarejestruj
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
