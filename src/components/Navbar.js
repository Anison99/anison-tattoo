import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { Button } from './Button';
import myLogo from '../images/logo96.png';
import SocialMedia from './SocialMedia';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

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

    checkLoggedInStatus(); // Sprawdź status zalogowania przy pierwszym renderowaniu

    // Nasłuchuj zmiany statusu zalogowania po zalogowaniu
    window.addEventListener('storage', () => {
      checkLoggedInStatus();
      // Jeśli użytkownik zaloguje się na innej karcie/przeglądarce, wywołamy funkcję sprawdzającą status
      navigate('/');
    });

    return () => {
      // Usuń nasłuchiwacz zmiany wielkości okna i nasłuchiwacz storage
      window.removeEventListener('resize', checkButtonSize);
      window.removeEventListener('storage', checkLoggedInStatus);
    };
  }, [navigate]); //navigate jako zależność

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
              {loggedIn ? (
                <span className='nav-links' onClick={() => { navigate('/profile'); closeMobileMenu(); }}>
                  Profil
                </span>
              ) : (
                <Link to="/login" className='nav-links' onClick={closeMobileMenu}>
                  Zaloguj
                </Link>
              )}
            </li>
            <li className='nav-item'>
              {loggedIn && (
                <Button buttonStyle='btn--outline' onClick={handleLogout}>
                  Wyloguj
                </Button>
              )}
            </li>
          </ul>
          {button && !loggedIn && (
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