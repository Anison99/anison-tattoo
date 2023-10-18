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
            <a href="https://www.pastelowelove.pl/userdata/public/gfx/5582/kotek-mruczek--naklejka.-naklejka-dla-dzieci.-dekoracje-pokoju.jpg">
                <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://kakadu.pl/blog/wp-content/uploads/2022/09/208827851-760x535-1.jpg">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://ipicasso.pl/image/cache/data/goods/00000004867-800x800.jpg">
                <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a href="https://www.sheba.pl/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf3331/files/2022-12/maae-kotki-rozwcentj-kota-od-maaego-jak-zadbaue-o-koci-c-ta__1617114058263.jpeg">
                <FontAwesomeIcon icon={faTiktok} />
            </a>
        </div>
      </Container>
    </div>
  )
}

export default SocialMedia

