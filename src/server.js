const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const cors = require('cors');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const sessionSecret = process.env.SESSION_SECRET || 'default-secret-key';
const dbFilePath = './database/database.db';

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

const db = new sqlite3.Database(dbFilePath);

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);

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

async function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.get(query, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = 'SELECT * FROM users WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      done(err);
    } else {
      done(null, row);
    }
  });
});

// obsługa rejestracji
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(query, [username, email, hashedPassword], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during registration' });
      }

      // Automatycznie zaloguj użytkownika po zarejestrowaniu
      req.login({ username, email, password: hashedPassword }, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error logging in after registration' });
        }
        return res.json({ message: 'Registration and login successful' });
      });
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
  console.log('User logged in:', req.user.username); // tylko przy poprawnym zalogowaniu
  res.json({ message: 'Login successful' });
});
// Rejestracja na sesję
app.post('/api/sessions', (req, res) => {
  try {
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;
    const userId = req.isAuthenticated() ? req.user.id : null;
    const query = 'INSERT INTO sessions (userId, sessionDate, sessionTime, messageToTattooArtist) VALUES (?, ?, ?, ?)';
    
    db.run(query, [userId, sessionDate, sessionTime, messageToTattooArtist], function(err) {
      if (err) {
        console.error('Error creating session:', err);
        return res.status(500).json({ message: 'Error creating session' });
      }

      const sessionId = this.lastID;
      const newSession = { id: sessionId, userId, sessionDate, sessionTime, messageToTattooArtist };
      res.status(200).json({ message: 'Session reservation successful', session: newSession });
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ message: 'Error creating session' });
  }
});

// Edycja sesji
app.put('/api/sessions/:sessionId', (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const { sessionDate, sessionTime, messageToTattooArtist } = req.body;
    const query = 'UPDATE sessions SET sessionDate = ?, sessionTime = ?, messageToTattooArtist = ? WHERE id = ?';
    
    db.run(query, [sessionDate, sessionTime, messageToTattooArtist, sessionId], function(err) {
      if (err) {
        console.error('Error editing session:', err);
        return res.status(500).json({ message: 'Error editing session' });
      }

      const updatedSession = { id: sessionId, sessionDate, sessionTime, messageToTattooArtist };
      res.status(200).json({ message: 'Session edit successful', session: updatedSession });
    });
  } catch (error) {
    console.error('Error editing session:', error);
    res.status(500).json({ message: 'Error editing session' });
  }
});

// Pobranie danych o sesji użytkownika
app.get('/api/user/sessions', (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = req.user.id;
    const query = 'SELECT * FROM sessions WHERE userId = ?';
    db.all(query, [userId], (err, rows) => {
      if (err) {
        console.error('Błąd pobierania sesji użytkownika:', err);
        res.status(500).json({ message: 'Wystąpił błąd podczas pobierania sesji użytkownika' });
      } else {
        res.status(200).json({ sessions: rows });
      }
    });
  } catch (error) {
    console.error('Błąd pobierania sesji użytkownika:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas pobierania sesji użytkownika' });
  }
});


// Usuwanie sesji
app.delete('/api/sessions/:sessionId', (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const query = 'DELETE FROM sessions WHERE id = ?';

    db.run(query, [sessionId], function(err) {
      if (err) {
        console.error('Error canceling session:', err);
        return res.status(500).json({ message: 'Error canceling session' });
      }

      res.status(200).json({ message: 'Session canceled successfully', canceledSession: { id: sessionId } });
    });
  } catch (error) {
    console.error('Error canceling session:', error);
    res.status(500).json({ message: 'Error canceling session' });
  }
});

// Wysyłanie wiadomości do studia
app.post('/api/messages', (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.isAuthenticated() ? req.user.id : null;
    const query = 'INSERT INTO messages (userId, content) VALUES (?, ?)';

    db.run(query, [userId, content], function(err) {
      if (err) {
        console.error('Error sending message:', err);
        return res.status(500).json({ message: 'Error sending message' });
      }

      const messageId = this.lastID;
      const newMessage = { id: messageId, userId, content };
      res.status(200).json({ message: 'Message sent successfully', newMessage });
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// nasłuchiwanie serwera
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
