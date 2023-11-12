import React, { useState, useEffect, useHistory } from 'react';
//import { useHistory } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {
  const history = useHistory();
    const [sessionData, setSessionData] = useState({
    sessionDate: '',
    sessionTime: '',
    messageToTattooArtist: '',
  });

  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // dodać kod do pobierania rezerwacji sesji po zalogowaniu użytkownika
    const sampleSessions = [
      {
        id: 1,
        sessionDate: '2023-11-15',
        sessionTime: '14:00',
        messageToTattooArtist: 'Proszę o wzór tatuażu',
      },
      {
        id: 2,
        sessionDate: '2023-12-05',
        sessionTime: '12:30',
        messageToTattooArtist: 'Mam kilka pomysłów na tatuaż',
      },
    ];
  
    setSessions(sampleSessions);
  }, []);

  const handleSessionSubmit = (e) => {
    e.preventDefault();

    fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionDate: sessionData.sessionDate,
        sessionTime: sessionData.sessionTime,
        messageToTattooArtist: sessionData.messageToTattooArtist,
      }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Zapisano się na sesję:', data);

        // Po zapisaniu sesji możesz odświeżyć listę sesji, aby pokazać aktualne dane użytkownika
        // Możesz użyć funkcji pobierającej sesje, która jest już w useEffect

        // Przekierowanie na stronę główną
        history.push('/');
      })
      .catch((error) => {
        console.error('Błąd zapisywania na sesję:', error);
      });
  };

  const handleSendMessage = () => {
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
      credentials: 'include', // Dodaj tę linię dla uwzględnienia ciasteczka sesji
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Wysłano wiadomość:', data);
      })
      .catch((error) => {
        console.error('Błąd wysyłania wiadomości:', error);
      });
  };
  
  const handleCancelSession = (sessionId) => {
    // Pusta funkcja, która nic nie robi
    console.log(`Odwołano sesję o ID: ${sessionId}`);
  };
  
  
  return (
    <div>
      <h2 className="profile-title">Profil użytkownika</h2>

      <div className="session-form">
        <h3>Zapisz się na sesję</h3>
        <form onSubmit={handleSessionSubmit}>
          <input
            type="date"
            value={sessionData.sessionDate}
            onChange={(e) => setSessionData({ ...sessionData, sessionDate: e.target.value })}
          />
          <input
            type="time"
            value={sessionData.sessionTime}
            onChange={(e) => setSessionData({ ...sessionData, sessionTime: e.target.value })}
          />
          <textarea
            value={sessionData.messageToTattooArtist}
            onChange={(e) =>
              setSessionData({ ...sessionData, messageToTattooArtist: e.target.value })
            }
            placeholder="Wiadomość do tatuatora"
          />
          <button type="submit">Zapisz się</button>
        </form>
      </div>

      <div className="appointments">
        <h3>Twoje rezerwacje sesji</h3>
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <p>Data: {session.sessionDate}</p>
              <p>Godzina: {session.sessionTime}</p>
              <p>Wiadomość do tatuatora: {session.messageToTattooArtist}</p>
              <button onClick={() => handleCancelSession(session.id)}>Odwołaj sesję</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="message-box">
        <h3>Wiadomość do studia</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Napisz wiadomość..."
        />
        <button onClick={handleSendMessage}>Wyślij</button>
      </div>
    </div>
  );
}

export default Profile;
