import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // Dodaj stan do obsługi błędów

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
      } else {
        const errorMessage = await response.text(); // Pobierz komunikat o błędzie z odpowiedzi
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
        <h2>Rejestracja</h2>
        {error && <p className="error-message">{error}</p>} {/* Wyświetl błąd, jeśli istnieje */}
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
