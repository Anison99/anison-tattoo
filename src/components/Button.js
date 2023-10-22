import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importuj style Bootstrap przed Twoimi stylami
import '../css/Button.css';

const STYLES = ['btn--primary','btn--outline'];

const SIZES = ['btn--medium', 'btn--large'];
export const Button = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize}) => {
     const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

     const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

     return(
        <Link to='/register' className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>

        </Link>
     )
    };
