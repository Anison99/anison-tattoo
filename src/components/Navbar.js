import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import '../css/Navbar.css';
import myLogo from '../images/logo96.png';
import SocialMedia from './SocialMedia';
import { Link } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false); // Dodaj stan zalogowanego użytkownika

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    // Wyczyść lokalny stan zalogowanego użytkownika
    localStorage.removeItem('user');
    setLoggedIn(false);
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

  // Sprawdź stan zalogowanego użytkownika po każdym odświeżeniu strony
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedIn(true);
    }
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
  {loggedIn ? ( // Sprawdź, czy użytkownik jest zalogowany
    <>
      <Link to="/profile" className='nav-links' onClick={closeMobileMenu}>
        Profil
      </Link>
      <Button buttonStyle='btn--outline' onClick={handleLogout}>
        Wyloguj
      </Button>
    </>
  ) : (
    <Link to="/login" className='nav-links' onClick={closeMobileMenu}>
      Zaloguj
    </Link>
  )}
</li>

          </ul>
          {button && !loggedIn && ( // Wyświetl przycisk "Zarejestruj" tylko jeśli nie jesteś zalogowany
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
