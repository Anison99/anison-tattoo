import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import '../css/Navbar.css';
import myLogo from '../images/logo96.png';
import SocialMedia from'./SocialMedia';

function Navbar() {
  const [click,setClick] = useState(false); {/* aktualizacja po kliknięciu w menu responsywne*/}
  const [button, setButton] = useState(true); {/* przycisk*/}

  const handleClick = () => setClick(!click); {/*funkcja negująca stan po kliknięciu w menu responywne*/}
  const closeMobileMenu = () => setClick(false);

  {/*funkcja wyswietlajaca przycisk na urz. mob. i sprawdzająca rozmiar ekranu*/}
  const showButton = () => {
    if(window.innerWidth <=960){
      setButton(false);
    }else{
      setButton(true);
    }
  };
  window.addEventListener('resize', showButton); {/*nasłuchiwacz pozwalający dostosować wyswietlanie przycisku*/}


  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
            <img src={myLogo} alt="My Logo" />
            <SocialMedia/>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} /> {/* menu responsywne logo font awesome*/}
            </div>
            {/*------------------------ NAWIGACJA DO SEKCJI ------------------------ */}
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/#' className='nav-links' onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/#about' className='nav-links' onClick={closeMobileMenu}>
                  O nas
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/#artworks' className='nav-links'  onClick={closeMobileMenu}>
                  Nasze prace
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/#contact' className='nav-links' onClick={closeMobileMenu}>
                  Kontakt
                </Link>
              </li>

              <li className='nav-item'>
                <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                  Zaloguj
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>Zaloguj</Button>}
        </div>
      </nav>
    </>
  )
}
export default Navbar
