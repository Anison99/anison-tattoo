import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../css/Register.css';
import { useLanguage } from '../language/LanguageContext.js';

const Register = () => {
  const { t, language } = useLanguage();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = userData;

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log('Rejestracja zakończona sukcesem');
        navigate('/'); // przekieruj na strone główną po rejestracji 
      } else {
        const errorMessage = await response.text();
        setError(`Błąd podczas rejestracji: ${errorMessage}`);
        console.error('Błąd podczas rejestracji:', errorMessage);
      }
    } catch (error) {
      setError('Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.');
      console.error('Wystąpił błąd podczas rejestracji:', error);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>{t('register')}</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">{t('user')}:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t('email')}:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{t('pass')}:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-button">
        {t('register')}
        </button>
      </form>
      <div>
        <p className="register-info">
        {t('quest3')} <Link to="/login">{t('quest4')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
