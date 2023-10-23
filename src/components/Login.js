import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css'; // Zaimportuj odpowiednie style

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wysłanie danych do serwera w celu uwierzytelnienia użytkownika
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        // Po udanym zalogowaniu można przekierować użytkownika na inną stronę
        window.location.href = '/'; // Przekierowanie na stronę główną

        // Ustaw zalogowanego użytkownika w stanie
        setUser({ email: userData.email });

        // Zapisz zalogowanego użytkownika w localStorage
        localStorage.setItem('user', JSON.stringify({ email: userData.email }));
        console.log('Zalogowano pomyślnie');
      } else {
        // W przypadku błędu odpowiedzi serwera
        setError('Nieprawidłowy email lub hasło. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas logowania:', error);
      setError('Wystąpił błąd podczas logowania. Spróbuj ponownie później.');
    }
  };

  const handleLogout = () => {
    // Obsługa wylogowania
    setUser(null); // Wyczyść zalogowanego użytkownika z stanu
    localStorage.removeItem('user'); // Usuń informacje o zalogowanym użytkowniku z localStorage
  };

  useEffect(() => {
    // Sprawdź, czy użytkownik jest już zalogowany w localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData); // Ustaw zalogowanego użytkownika w stanie
    }
  }, []);

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Logowanie</h2>
        {error && <p className="error-message">{error}</p>}
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
        {user ? ( // Jeśli użytkownik jest zalogowany
          <button type="button" className="login-button" onClick={handleLogout}>
            Wyloguj
          </button>
        ) : (
          <button type="submit" className="login-button">
            Zaloguj się
          </button>
        )}
      </form>
      <div>
        <p className="login-info">
          Nie masz jeszcze konta? <Link to="/register">{user ? 'WYLOGUJ' : 'Zarejestruj się'}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
