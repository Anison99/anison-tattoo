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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wysłanie danych do serwera i zapisanie ich w bazie MongoDB
    // Przy użyciu np. fetch lub Axios
    // Należy obsłużyć odpowiednie zapytanie do serwera
    // Po udanej rejestracji można przekierować użytkownika na inną stronę
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
