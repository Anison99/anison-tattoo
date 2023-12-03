import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Profile.css';
import { useLanguage } from '../language/LanguageContext.js';
import { format } from 'date-fns';

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

  // zapisanie się na sesje
  const handleSessionSubmit = async (e) => {
    e.preventDefault();

    let response; // Zadeklaruj zmienną response na poziomie funkcji

    if (sessionData.sessionId) {
      const formattedDate = format(new Date(sessionData.sessionDate), 'yyyy-MM-dd'); // Użyj format z date-fns

      try {
        response = await fetch(`http://localhost:5000/api/sessions/${sessionData.sessionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionDate: formattedDate,
            sessionTime: sessionData.sessionTime,
            messageToTattooArtist: sessionData.messageToTattooArtist,
          }),
          credentials: 'include',
        });

        if (response.ok) {
          console.log('Edytowano sesję');
          fetchSessions();
        } else {

          console.error('Błąd edycji sesji:', await response.text());
        }
      } catch (error) {
        console.error('Błąd edycji sesji:', error);
      }
    } else {
      // Kod na zapis nowej sesji
      const formattedDate = format(new Date(sessionData.sessionDate), 'yyyy-MM-dd'); // Użyj format z date-fns

      try {
        response = await fetch('http://localhost:5000/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionDate: formattedDate,
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
    }

    setSessionData({
      sessionId: null,
      sessionDate: '',
      sessionTime: '',
      messageToTattooArtist: '',
    });
  };

  const handleEditSession = (session) => {
    setSessionData({
      sessionId: session._id,
      sessionDate: new Date(session.sessionDate).toISOString().split('T')[0], // Tutaj zmieniamy format daty
      sessionTime: session.sessionTime,
      messageToTattooArtist: session.messageToTattooArtist,
    });
  };

  const handleCancelSession = async (sessionId) => {
    console.log('Canceling session ID:', sessionId); // Dodany console.log
    try {
      const response = await fetch(`http://localhost:5000/api/sessions/${sessionId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        console.log(`Odwołano sesję o ID: ${sessionId}`);
        fetchSessions();
      } else {
        console.error('Błąd odwoływania sesji:', await response.text());
      }
    } catch (error) {
      console.error('Błąd odwoływania sesji:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Wysłano wiadomość');
      } else {
        console.error('Błąd wysyłania wiadomości:', await response.text());
      }
    } catch (error) {
      console.error('Błąd wysyłania wiadomości:', error);
    }
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
            onChange={(e) => setSessionData({ ...sessionData, messageToTattooArtist: e.target.value })}
            placeholder={t('session3')}
          />
          <button type="submit">
            {sessionData.sessionId ? t('session4') : t('session5')}
          </button>
        </form>

      </div>
      {sessions && sessions.length > 0 ? (
        <div className="appointments">
          <h3>{t('res1')}</h3>
          <ul>
            {console.log("Sessions:", sessions)}
            {sessions.map((session) => (
              <li key={session._id}>
                <p>{t('res2')}: {format(new Date(session.sessionDate), 'yyyy-MM-dd')}</p>
                <p>{t('res3')}: {session.sessionTime}</p>
                <p>{t('session3')}: {session.messageToTattooArtist}</p>
                <button onClick={() => handleEditSession(session)}>{t('session1')}</button>
                <button
                  onClick={() => {
                    if (session._id) { // Sprawdź poprawność ID sesji
                      console.log("Canceling session ID:", session._id);
                      handleCancelSession(session._id);
                    } else {
                      console.error("Invalid session ID");
                    }
                  }}
                >
                  {t('res4')}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        console.log("no sesions register")
      )}
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