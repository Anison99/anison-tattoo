import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // Przesyłamy dane z formularza
    });
  
    if (response.ok) {
      console.log('Rejestracja zakończona sukcesem');
    } else {
      console.error('Błąd podczas rejestracji');
    }
  };
  
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Rejestracja</h2>
        <div className="form-group">
          <label htmlFor="username">Nazwa użytkownika:</label>
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
          <label htmlFor="email">Adres email:</label>
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
          <label htmlFor="password">Hasło:</label>
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
          Zarejestruj się
        </button>
      </form>
      <div>
        <p className="register-info">
          Masz już konto? <Link to="/login">Zaloguj się!</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
