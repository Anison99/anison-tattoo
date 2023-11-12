import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState({
    sessionId: null,
    sessionDate: '',
    sessionTime: '',
    messageToTattooArtist: '',
  });

  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Pobierz rzeczywiste rezerwacje sesji użytkownika po zalogowaniu
    fetch('http://localhost:5000/api/user/sessions', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setSessions(data.sessions);
      })
      .catch((error) => {
        console.error('Błąd pobierania sesji:', error);
      });
  }, []);

  const handleSessionSubmit = (e) => {
    e.preventDefault();

    if (sessionData.sessionId) {
      // Edytuj sesję
      fetch(`http://localhost:5000/api/sessions/${sessionData.sessionId}`, {
        method: 'PUT',
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
          console.log('Edytowano sesję:', data);

          // Po edycji sesji odśwież listę sesji
          fetchSessions();
        })
        .catch((error) => {
          console.error('Błąd edycji sesji:', error);
        });
    } else {
      // Nowa rezerwacja sesji
      fetch('http://localhost:5000/api/sessions', {
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

          // Po zapisaniu sesji odśwież listę sesji
          fetchSessions();
        })
        .catch((error) => {
          console.error('Błąd zapisywania na sesję:', error);
        });
    }

    // Zresetuj stan formularza
    setSessionData({
      sessionId: null,
      sessionDate: '',
      sessionTime: '',
      messageToTattooArtist: '',
    });
  };

  const fetchSessions = () => {
    // Pobierz rzeczywiste rezerwacje sesji użytkownika po zalogowaniu
    fetch('http://localhost:5000/api/user/sessions', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setSessions(data.sessions);
      })
      .catch((error) => {
        console.error('Błąd pobierania sesji:', error);
      });
  };

  const handleEditSession = (session) => {
    // Ustaw dane sesji w formularzu do edycji
    setSessionData({
      sessionId: session.id,
      sessionDate: session.sessionDate,
      sessionTime: session.sessionTime,
      messageToTattooArtist: session.messageToTattooArtist,
    });
  };

  const handleCancelSession = (sessionId) => {
    // Wyślij żądanie do serwera w celu odwołania sesji
    fetch(`http://localhost:5000/api/sessions/${sessionId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(`Odwołano sesję o ID: ${sessionId}`);
            setSessions((prevSessions) => prevSessions.filter((session) => session.id !== sessionId)); // Zaktualizuj stan sesji, usuwając odwołaną sesję
        })
        .catch((error) => {
            console.error('Błąd odwoływania sesji:', error);
        });
};
  
const handleSendMessage = () => {
  fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          content: message,
      }),
      credentials: 'include',
  })
      .then((response) => response.json())
      .then((data) => {
          console.log('Wysłano wiadomość:', data);
      })
      .catch((error) => {
          console.error('Błąd wysyłania wiadomości:', error);
      });
};

  return (
    <div>
      <h2 className="profile-title">Profil użytkownika</h2>

      <div className="session-form">
        <h3>{sessionData.sessionId ? 'Edytuj sesję' : 'Zapisz się na sesję'}</h3>
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
          <button type="submit">{sessionData.sessionId ? 'Zapisz zmiany' : 'Zapisz się'}</button>
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
              <button onClick={() => handleEditSession(session)}>Edytuj sesję</button>
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
