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
app.use(passport.session()); // Dodaj obsługę sesji dla Passport

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
