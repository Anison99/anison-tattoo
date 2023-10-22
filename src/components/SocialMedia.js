import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/SocialMedia.css';

import { Container} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF, faInstagram, faPinterest, faTiktok} from '@fortawesome/free-brands-svg-icons';


function SocialMedia() {
  return (
    <div>
      <Container>
        <div className='singleCol social-media-icons-custom'>
          <a href="https://www.facebook.com/twojprofil">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://www.instagram.com/twojprofil">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.pinterest.com/twojprofil">
            <FontAwesomeIcon icon={faPinterest} />
          </a>
          <a href="https://www.tiktok.com/twojprofil">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </Container>
    </div>
  );
}

export default SocialMedia

