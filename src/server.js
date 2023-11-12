// Serwer API
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cors = require('cors');
const fs = require('fs');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET || 'default-secret-key';

const usersFilePath = './database/users.json';
const sessionsFilePath = './database/sessions.json';
const messagesFilePath = './database/messages.json';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const users = JSON.parse(fs.readFileSync(usersFilePath));
      const user = users.find(u => u.email === email);

      if (!user) {
        return done(null, false, { message: 'Invalid email' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath));
  const user = users.find(u => u.id === id);
  done(null, user);
});

// Kod obsługi rejestracji użytkownika
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFilePath));
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Po udanej rejestracji automatycznie logujemy użytkownika
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging in after registration' });
      }
      return res.json({ message: 'Registration and login successful' });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

// Kod obsługi logowania użytkownika
app.post('/login', passport.authenticate('local', {
  failureFlash: true,
}), (req, res) => {
  // Ta część zostanie osiągnięta tylko w przypadku pomyślnego logowania
  console.log('User logged in:', req.user.username);
  res.json({ message: 'Login successful' });
});

// Przykładowa obsługa wysyłania wiadomości
app.post('/send-message', (req, res) => {
  const { message } = req.body;
  // Tutaj można dodać kod obsługi wysyłania wiadomości, np. zapis do pliku lub bazy danych
  console.log('Received message:', message);
  res.json({ message: 'Message sent successfully' });
});

// Dodaj obsługę ścieżki /api/success
app.get('/api/success', (req, res) => {
  res.json({ message: 'Success!' });
});

// Obsługa rezerwacji sesji
app.post('/api/sessions', (req, res) => {
  try {
    // Odczytaj dane sesji z ciała żądania
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;

    // Pobierz identyfikator zalogowanego użytkownika z sesji
    const userId = req.isAuthenticated() ? req.user.id : null;

    // Pobierz istniejące sesje z pliku (lub z bazy danych)
    const sessions = JSON.parse(fs.readFileSync(sessionsFilePath));

    // Generuj unikalne ID dla nowej sesji
    const sessionId = Date.now().toString();

    // Utwórz nową sesję z przypisanym identyfikatorem użytkownika
    const newSession = {
      id: sessionId,
      userId: userId, // Dodanie identyfikatora użytkownika
      sessionDate,
      sessionTime,
      messageToTattooArtist,
    };

    // Dodaj nową sesję do listy sesji
    sessions.push(newSession);

    // Zapisz zaktualizowaną listę sesji do pliku (lub bazy danych)
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));

    // Odpowiedz klientowi informacją o sukcesie
    res.status(200).json({ message: 'Rezerwacja sesji zakończona sukcesem', session: newSession });
  } catch (error) {
    console.error('Błąd rezerwacji sesji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rezerwacji sesji' });
  }
});

// Edytuj sesję
app.put('/api/sessions/:sessionId', (req, res) => {
  try {
    const sessionId = req.params.sessionId;

    // Odczytaj dane sesji z ciała żądania
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;

    // Pobierz istniejące sesje z pliku (lub z bazy danych)
    const sessions = JSON.parse(fs.readFileSync(sessionsFilePath));

    // Znajdź sesję do edycji
    const editedSessionIndex = sessions.findIndex(session => session.id === sessionId);

    // Sprawdź, czy sesja istnieje
    if (editedSessionIndex === -1) {
      return res.status(404).json({ message: 'Sesja nie istnieje' });
    }

    // Edytuj dane sesji
    sessions[editedSessionIndex] = {
      ...sessions[editedSessionIndex],
      sessionDate,
      sessionTime,
      messageToTattooArtist,
    };

    // Zapisz zaktualizowaną listę sesji do pliku (lub bazy danych)
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));

    // Odpowiedz klientowi informacją o sukcesie
    res.status(200).json({ message: 'Edycja sesji zakończona sukcesem', session: sessions[editedSessionIndex] });
  } catch (error) {
    console.error('Błąd edycji sesji:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas edycji sesji' });
  }
});

// Dodaj obsługę DELETE dla ścieżki /api/sessions/:sessionId
app.delete('/api/sessions/:sessionId', (req, res) => {
  try {
      const sessionId = req.params.sessionId;

      // Odczytaj istniejące sesje z pliku (lub z bazy danych)
      const sessions = JSON.parse(fs.readFileSync(sessionsFilePath));

      // Znajdź indeks sesji do odwołania
      const sessionIndex = sessions.findIndex((session) => session.id === sessionId);

      // Sprawdź, czy sesja została znaleziona
      if (sessionIndex === -1) {
          return res.status(404).json({ message: 'Session not found' });
      }

      // Usuń sesję z listy sesji
      const canceledSession = sessions.splice(sessionIndex, 1)[0];

      // Zapisz zaktualizowaną listę sesji do pliku (lub bazy danych)
      fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));

      // Odpowiedz klientowi potwierdzeniem odwołania sesji
      res.status(200).json({ message: 'Session canceled successfully', canceledSession });
  } catch (error) {
      console.error('Błąd odwoływania sesji:', error);
      res.status(500).json({ message: 'Wystąpił błąd podczas odwoływania sesji' });
  }
});

app.get('/api/user/sessions', (req, res) => {
  try {
    // Sprawdź, czy użytkownik jest zalogowany
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Pobierz ID zalogowanego użytkownika
    const userId = req.user.id;

    // Odczytaj dane sesji z pliku (lub z bazy danych)
    const sessions = JSON.parse(fs.readFileSync(sessionsFilePath));

    // Filtruj sesje, aby uzyskać tylko te przypisane do zalogowanego użytkownika
    const userSessions = sessions.filter(session => session.userId === userId);

    // Odpowiedz klientowi z danymi sesji użytkownika
    res.status(200).json({ sessions: userSessions });
  } catch (error) {
    console.error('Błąd pobierania sesji użytkownika:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas pobierania sesji użytkownika' });
  }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
