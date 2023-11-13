import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import { useLanguage } from '../language/LanguageContext.js';


const Profile = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState({
    sessionId: null,
    sessionDate: '',
    sessionTime: '',
    messageToTattooArtist: '',
  });

  const [sessions, setSessions] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSessions = async () => {
    // Pobierz rzeczywiste rezerwacje sesji użytkownika po zalogowaniu
    try {
      const response = await fetch('http://localhost:5000/api/user/sessions', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Błąd pobierania sesji:', error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleSessionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/sessions', {
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
      });

      if (response.ok) {
        console.log('Zapisano się na sesję');
        fetchSessions();
      } else {
        console.error('Błąd zapisywania na sesję:', await response.text());
      }
    } catch (error) {
      console.error('Błąd zapisywania na sesję:', error);
    }

    setSessionData({
      sessionId: null,
      sessionDate: '',
      sessionTime: '',
      messageToTattooArtist: '',
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
        setSessions((prevSessions) =>
          prevSessions.filter((session) => session.id !== sessionId)
        ); // Zaktualizuj stan sesji, usuwając odwołaną sesję
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
      <h2 className="profile-title">{t('user1')}</h2>

      <div className="session-form">
        <h3>{sessionData.sessionId ? t('session1') : t('session2')}</h3>
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
            placeholder={t('session3')}
          />
          <button type="submit">
            {sessionData.sessionId ? t('session4') : t('session5')}
          </button>
        </form>
      </div>

      <div className="appointments">
        <h3>{t('res1')}</h3>
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              <p>{t('res2')}: {session.sessionDate}</p>
              <p>{t('res3')}: {session.sessionTime}</p>
              <p>{t('session3')}: {session.messageToTattooArtist}</p>
              <button onClick={() => handleEditSession(session)}>{t('session1')}</button>
              <button onClick={() => handleCancelSession(session.id)}>{t('res4')}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="message-box">
        <h3>{t('mes1')}</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('mes2')}
        />
        <button onClick={handleSendMessage}>{t('mes3')}</button>
      </div>
    </div>
  );
};

export default Profile;
